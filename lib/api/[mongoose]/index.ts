import type { NextApiRequest, NextApiResponse } from 'next'
import { getModel } from '../../../models'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  try {
    const { query: { collection, id }, method } = req
  const model = getModel(collection as string, res)
    switch (req.method) {
      case "GET":
        const allItem = await model.find()
        res.status(201).json(allItem)
        break
      case "POST":
        const item =  req.body
        const data = await model.create(item)
        res.status(200).json(data)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.log(error)
      res.status(500).json({ error : error.message })
  }
}

   


