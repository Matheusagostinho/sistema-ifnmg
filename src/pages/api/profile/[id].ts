import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from 'utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query

    const { db } = await connectToDatabase()
    const _id = new ObjectId(String(id))
    const response = await db.collection('associations').findOne({ _id })

    res.status(200).json(response)
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
