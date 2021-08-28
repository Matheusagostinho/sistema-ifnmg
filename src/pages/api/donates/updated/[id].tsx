import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from 'utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id } = req.query
    const data = {
      withdrawn: true,
      withdrawnDate: new Date()
    }
    const { db } = await connectToDatabase()

    const _id = new ObjectId(String(id))

    const response = await db
      .collection('donates')
      .findOneAndUpdate({ _id }, { $set: data }, { returnDocument: 'after' })

    res.status(200).json(response.value)
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
