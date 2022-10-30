import { useEffect, useState } from "react";
import * as React from "react"
import { TextInput, Textarea, NumberInput, Select, Group, Checkbox, MultiSelect, Button, ColorInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import createStyles from './Form.styles';
import { FileInput } from './FileInput';
import { UseFormReturnType } from '@mantine/form';

type selectDataType = { value: string, label: string }[] | string[]


type InputProps = {
    type: string,
    name: string,
    form: UseFormReturnType<any>
    children: string,
    selectData?: selectDataType
    propertyToRender?: string,
    handler?: (data: FormData) => void,
}

export default function Input({ type, name, form, children, selectData, propertyToRender, handler }: InputProps) {

    if (type === "select" && selectData === undefined) { throw Error("You must specify the data for a select input") }
    if (type === "file" && handler === undefined) { throw Error("You must specify the handler (handleFile) for a File input") }
    const { classes } = createStyles();
    const [objectURL, setObjectURL] = useState("");


    const dataToRender =
        selectData !== undefined && typeof selectData[0] !== "string"
            ? selectData.map((d) => d[propertyToRender as keyof typeof d])
            : selectData as unknown as selectDataType
    const [data, setData] = useState<selectDataType>(dataToRender)

    const valueSelect = Array.isArray(form.values[name]) && form.values[name][0] !== undefined
        ? form.values[name].map((p: any) => p[propertyToRender as keyof typeof p])
        : form.values[name] === Object(form.values[name]) ? form.values[name][propertyToRender as string] : form.values[name]
    const [value, setValue] = useState(valueSelect)
    const [render, setRender] = useState(true)
    useEffect(() => {
        if (render) {
            setRender(false)
            if (Array.isArray(valueSelect) && valueSelect[0] !== undefined) {
                form.setFieldValue(name, valueSelect)
            } else {
                form.setFieldValue(name, value)
            }
        }
    }, [form, render, name, valueSelect, value,])

    const handlerFile = (event: React.ChangeEvent<HTMLInputElement>, formData: FormData) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setObjectURL(`/uploads/${i.name}`)
            form.setFieldValue(name, `/uploads/${i.name}`)
            handler ? handler(formData) : null
        };

    }


    switch (type) {
        case "text":
            return <TextInput
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`)}
            />
        case "textarea":
            return <Textarea
                label={children}
                className={classes.input}
                autosize
                minRows={2}
                maxRows={4}
                {...form.getInputProps(`${name}`)}
            />
        case "date":
            return <DatePicker
                initialLevel="month"
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`)}
            />
        case "color":
            return <ColorInput
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`)}
            />;
        case "number":
            return <NumberInput
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`)}
            />
        case "checkbox":
            return <Checkbox
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`, { type: 'checkbox' })}
            />
        case "multi-select":
            return <MultiSelect
                label={children}
                data={data}
                className={classes.input}
                value={value}
                onChange={(data) => {
                    setValue(data)
                    setRender(true)
                }}
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                    setData((current) => [...current as string[], query]);
                    return query;
                }}

            />

        case "select":
            return (
                <Select
                    label={children}
                    className={classes.input}
                    data={data}
                    value={value}
                    onChange={(data) => {
                        setValue(data)
                        setRender(true)
                    }}
                />
            )
        case "image":
            return (
                <>
                    <Group className={classes.fileInput}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="Pas d'image associé" width={250} height={250} src={objectURL ? objectURL : form.values[name] as string} />
                        <FileInput
                            label={children}
                            uploadFileName="theFiles"
                            onChange={handlerFile}
                        />
                    </Group>

                </>
            )
        case "file":
            return (
                <>
                    <Group className={classes.fileInput}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <p>{objectURL ? objectURL : form.values[name] as string}</p>
                        <FileInput
                            label={children}
                            uploadFileName="theFiles"
                            onChange={handlerFile}
                        />
                    </Group>

                </>
            )
        case "_id":
            return null;
        case "id":
            return null;
        case null:
            return null;
        default:
            return <TextInput
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`)}
            />
    }


}