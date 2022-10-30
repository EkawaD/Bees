import { useState } from 'react';
import { Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import Crud from '..';
import Form from '../Form';
import Input from '../Form/Input';

type Item = {
    id?: string | number
}

type CrudProps<T> = {
    items: T[],
    schema: { [key in keyof T]: any },
    baseURL: string,
    className?: string
    title?: string,
    identifier: string,
    user: User
}

export default function CrudTable<T extends Item>({ items, schema, baseURL, className, title, identifier, user }: CrudProps<T>) {

    const tple = Object.keys(schema).map((value) => {
        if (!items[0]) return { [value as keyof T]: "" }
        if (typeof items[0][value as keyof T] === "boolean") return { [value as keyof T]: false }
        if (Array.isArray(items[0][value as keyof T])) return { [value as keyof T]: [] }
        return { [value as keyof T]: "" }
    })
    // @ts-ignore: spread must be a tuple or be passed as a rest parameter
    const mockedItem = Object.assign(...tple)
    const initialValues: T = structuredClone(mockedItem) as T
    const formProps: { [key in keyof typeof mockedItem]: any } = structuredClone(mockedItem)
    Object.entries(schema).map(([key, value]) => {
        formProps[key as keyof typeof formProps] = { type: value.type, label: value.label, data: value.data, propertyToRender: value.propertyToRender, handler: value.handler }
    })

    const form = useForm<T>({
        initialValues
    })

    const [data, setData] = useState(items)
    const [opened, setOpened] = useState(false);
    const [action, setAction] = useState("new");


    const handler = () => {
        if (action === "new") return handleNew
        if (action === "edit") return handleEdit
        return handleNew
    }
    const handleDelete = async (values: T) => {
        try {
            const res = await fetch(`${baseURL}/${values[identifier as keyof typeof values]}`, {
                method: "DELETE"
            });
            setData((data) => data.filter(p => p[identifier as keyof typeof p] !== values[identifier as keyof typeof values]))
        } catch (error) {
            console.log(error)
        }

    };
    const handleNew = async (values: T) => {
        try {

            const res = await fetch(baseURL, {
                method: "POST",
                headers: {
                    Authorization: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, userId: user.id })
            });
            const newItem = await res.json()
            setData((data) => [...data, newItem])
            setOpened(false)
        } catch (error) {
            console.log(error)
            setOpened(false)
        }
    };
    const handleEdit = async (values: T) => {
        try {
            const res = await fetch(`${baseURL}/${values[identifier as keyof typeof values]}`, {
                method: "PUT",
                headers: {
                    Authorization: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });
            const updatedItem = await res.json();
            setData((data) => data.map(p => (p[identifier as keyof typeof p] === values[identifier as keyof typeof values] ? updatedItem.data : p)))
            setOpened(false)
        } catch (error) {
            console.log(error)
            setOpened(false)
        }
    };
    const newItem = () => {
        form.reset()
        setAction("new")
        setOpened(true)
    };
    const editItem = (data: T) => {
        form.setValues(data)
        setAction("edit")
        setOpened(true)
    };

    return (
        <>
            <Crud<T>
                newAction={newItem}
                editAction={editItem}
                deleteAction={handleDelete}
                payload={data}
                className={className}
                title={title}
            >
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    size="70vw"
                    overlayOpacity={0.55}
                    overlayBlur={3}
                >
                    <Form form={form} handler={handler()}>
                        <>
                            {Object.entries(formProps).map(([key, props]) => (
                                <Input key={key}
                                    type={props.type}
                                    name={key}
                                    form={form}
                                    selectData={props.data}
                                    handler={props.handler}
                                    propertyToRender={props.propertyToRender}
                                >{props.label}</Input>
                            ))}
                        </>


                    </Form>
                </Modal>
            </Crud>
        </>
    );

}




