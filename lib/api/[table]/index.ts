import type { NextApiRequest, NextApiResponse } from 'next'
import { subscribeToApi, callSubscribers } from '../../../middleware/handlers'
import { prisma } from '../../../middleware/prisma'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const { query: { table }, method } = req
  const custumMethod = method === "GET" ? "ALL" : "POST"
  loadSubscribers()
  const call = callSubscribers(table,custumMethod)
  try {
    await call(req, res, table)
  } catch (error) {
      console.log(error)
      res.status(500).json({ error : error.toString() })
  }
}



export const loadSubscribers = () => {

  subscribeToApi("user", "ALL",
    async (req: NextApiRequest, res: NextApiResponse) => {
      const users = await prisma.user.findMany({ include: { posts: true } })
      res.status(200).json(users)
    })
}


