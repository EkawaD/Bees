import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";

type HTMLCrud = HTMLInputElement | HTMLFormElement | HTMLButtonElement | null

type Item = {
    id?: string
}

type CrudContextProps<T> = {
    children: React.ReactNode,
    baseURL: string,
    setData: Dispatch<SetStateAction<T[]>>
    editRef?: MutableRefObject<HTMLCrud>
    newRef?: MutableRefObject<HTMLCrud>
    deleteRef?: MutableRefObject<HTMLCrud[]>
    updateRef?: MutableRefObject<HTMLCrud[]>
}


export default function CrudContext<T extends Item>({ children, baseURL, setData, editRef, newRef, deleteRef, updateRef }: CrudContextProps<T>) {

    const [shouldRender, setShouldRender] = useState(true)

    useEffect(() => {
        setShouldRender(false)
    }, [shouldRender])



    const handleDelete = async (e: any) => {
        try {
            const id = e.target.getAttribute("data-id")
            const res = await fetch(`${baseURL}/${id}`, {
                method: "DELETE"
            });
            setData((data) => data.filter(p => Number(p.id) !== Number(id)))
            setShouldRender((render) => !render)
        } catch (error) {
            console.log(error)
            setShouldRender((render) => !render)
        }

    };
    const handleNew = async (e: any) => {
        e.preventDefault()
        try {
            const data = new FormData(e.target)
            const values = Object.fromEntries(data)
            const res = await fetch(baseURL, {
                method: "POST",
                headers: {
                    Authorization: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, userId: 1 })
            });
            const newItem = await res.json()
            res.status === 201 && setData((data) => [...data, newItem])
            setShouldRender((render) => !render)
        } catch (error) {
            console.log(error)
            setShouldRender((render) => !render)
        }
    };
    const handleEdit = async (e: any) => {
        e.preventDefault()
        try {
            const id = e.target.getAttribute("data-id")
            const data = new FormData(e.target)
            const values = Object.fromEntries(data)
            const res = await fetch(`${baseURL}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });
            const updatedItem = await res.json();
            setData((data) => data.map(p => (Number(p.id) === Number(id) ? updatedItem.data : p)))
            setShouldRender((render) => !render)
        } catch (error) {
            console.log(error)
            setShouldRender((render) => !render)
        }
    };
    const handleUpdate = async (e: any) => {
        try {
            const id = e.target.getAttribute("data-id")
            const res = await fetch(`${baseURL}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: e.target.checked })
            });
            const updatedItem = await res.json();
            setData((data) => data.map(p => (Number(p.id) === Number(id) ? updatedItem.data : p)))
            setShouldRender((render) => !render)
        } catch (error) {
            console.log(error)
            setShouldRender((render) => !render)
        }

    };

    newRef && newRef.current ? newRef.current.onsubmit = handleNew : null
    editRef && editRef.current ? editRef.current.onsubmit = handleEdit : null
    deleteRef && deleteRef.current.map((r) => r ? r.onclick = handleDelete : null)
    updateRef && updateRef.current.map((r) => r ? r.onchange = handleUpdate : null)



    return (
        <>
            {children}
        </>
    );

}




