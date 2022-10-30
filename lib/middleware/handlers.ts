import { prisma } from './prisma';
import type { NextApiRequest, NextApiResponse } from 'next';


const API_CALL = {}
const DEFAULT_CALL = {
    "ALL": async (req: NextApiRequest, res: NextApiResponse, table: string | string[]) => {
        const allItem = await prisma[table as string].findMany()
        res.status(200).json(allItem)
    }, 
    "POST": async (req: NextApiRequest, res: NextApiResponse, table: string | string[]) => {
        const item =  req.body
        const data = await prisma[table as string].create({data: item})
        res.status(201).json(data)
    }, 
    "GET": async (req: NextApiRequest, res: NextApiResponse, table: string | string[]) => {
        const { query: { id } } = req
        const items = await prisma[table as string].findUnique({where: { id: Number(id) }})
        res.status(200).json(items)
    }, 
    "PUT": async (req: NextApiRequest, res: NextApiResponse, table: string | string[]) => {
        const { query: { id } } = req
        const updateItem = req.body
        const updated = await prisma[table as string].update({where: { id: Number(id) }, data: updateItem})
        res.status(200).json({ data: updated, message: "Updated successfully" })
    }, 
    "DELETE": async (req: NextApiRequest, res: NextApiResponse, table: string | string[]) => {
        const { query: { id }} = req
        const deleted = await prisma[table as string].delete({where: { id: Number(id) }})
        res.status(200).json({ data: deleted, message: "Deleted successfully" })
    }, 
}

export const subscribeToApi = (table, method, callback) => {
    const call = `${table}_${method}`
    API_CALL[call] = callback
}

export const callSubscribers = (table, method) => {
    const call = `${table}_${method}`
    if (API_CALL[call] !== undefined) return API_CALL[call];
    return DEFAULT_CALL[method]
}