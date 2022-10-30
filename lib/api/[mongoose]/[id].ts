import type { NextApiRequest, NextApiResponse } from 'next'
import { getModel } from '../../../models'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { collection, id }, method } = req
  const model = getModel(collection as string, res)
    try {
      switch (method) {
        case "GET":
            const item = await model.findById(id)
            res.status(200).json(item)
            break
        case "PUT":
            const updateItem = req.body
            const updated = await model.findByIdAndUpdate(id, { $set: updateItem })
            res.status(200).json({ data: updateItem, message: "Updated successfully" })
            break
        case "DELETE":
            const deleted = await model.findByIdAndDelete(id)
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

