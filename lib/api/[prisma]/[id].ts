import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../middleware/prisma'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { collection, id }, method } = req
    try {
      switch (method) {
        case "GET":
            const items = await prisma[collection as string].find({
              where: { id: Number(id) },
              include: true
            })
            res.status(200).json(items)
            break
        case "PUT":
            const updateItem = req.body
            const updated = await prisma[collection as string].update({
              where: { id: Number(id) },
              data: updateItem
            })
            res.status(200).json({ data: updated, message: "Updated successfully" })
            break
        case "DELETE":
            const deleted = await prisma[collection as string].delete({
              where: { id: Number(id) }
            })
            res.status(200).json({ data: deleted, message: "Deleted successfully" })
            break
        default:
          res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
          res.status(405).end(`Method ${method} Not Allowed`)
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error : error.message })
    }
}

