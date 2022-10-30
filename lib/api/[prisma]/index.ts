import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../middleware/prisma'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  try {
    const { query: { collection }, method } = req
    switch (req.method) {
      case "GET":
        const allItem = await prisma[collection as string].findMany()
        res.status(201).json(allItem)
        break
      case "POST":
        const item =  req.body
        const data = await prisma[collection as string].create({data: item})
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



   


