import { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from 'utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id_city } = req.query
    console.log(id_city)
    const { db } = await connectToDatabase()

    const response = await db
      .collection('associations')
      .find({ id_city })
      .toArray()

    res.status(200).json(response)
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
