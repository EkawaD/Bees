import * as React from "react";
import { Button, Table } from '@mantine/core';
import createStyles from './Crud.styles';


type CrudType<T> = {
    children: React.ReactNode,
    newAction: () => void,
    editAction: (data: any) => void,
    deleteAction: (data: any) => Promise<void>,
    payload: T[],
    className?: string,
    title?: string
}

export default function Crud<T extends object>({ children, newAction, editAction, deleteAction, payload, className, title }: CrudType<T>) {

    const { classes } = createStyles();
    const doNotDisplay = ["id", "_id", "__v", "userId"]
    const columns = payload !== undefined && payload[0] !== undefined ? Object.keys(payload[0]).filter((col) => !doNotDisplay.includes(col)) : []

    const readableProp = (prop: any) => {
        if (prop === false) return "false"
        if (prop === true) return "true"
        if (Array.isArray(prop)) return prop.map((data) => (data.name || data.title || data) + ", ")
        if (prop === Object(prop)) return prop.name
        if ((typeof prop === 'string' || prop instanceof String) && prop.length >= 20) return prop.substring(0, 20) + "..."
        return prop
    }

    return (
        <>
            <div>

                <div className={classes.head}>
                    <h2>{title}</h2>
                    <Button m={10} type="button" data-attr="add" color="green" variant="outline" onClick={() => newAction()}>Ajouter</Button>
                </div>

                <Table striped highlightOnHover className={className + " " + classes.table} >
                    <thead>
                        <tr>
                            {columns.map((column, key) => (
                                <th key={key}>{column}</ th>
                            ))}
                            <th > Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payload && payload.map((data, key) => (
                            <tr key={key}>
                                {columns.map((column, key) => (
                                    <td key={key}>{readableProp(data[column as keyof typeof data])}</td>
                                ))}
                                <td className={classes.actions}>
                                    <Button type="button" variant="outline" data-attr="edit" onClick={() => editAction(data)}>Edit</Button>
                                    <Button type="button" variant="outline" color="red" data-attr="delete" onClick={() => deleteAction(data)}>X</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {children}
            </div>



        </>
    );
}