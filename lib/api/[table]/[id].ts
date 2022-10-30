import type { NextApiRequest, NextApiResponse } from 'next'
import { loadSubscribers } from '.'
import { callSubscribers } from '../../../middleware/handlers'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { table, id }, method } = req
  loadSubscribers()
  const call = callSubscribers(table, method)

  try {
    await call(req, res, table)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error : error.toString() })
  }

}

