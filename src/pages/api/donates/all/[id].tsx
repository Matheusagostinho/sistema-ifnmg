import { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from 'utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query
    const id_association = id
    const { db } = await connectToDatabase()

    const response = await db
      .collection('donates')
      .find({ id_association })
      .toArray()

    res.status(200).json(response)
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
