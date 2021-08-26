import { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from 'utils/database'
import { ObjectId } from 'mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body

    const email = req.body.email // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same

    if (!data.name) {
      res.status(400).send('Missing field(s)')
    }
    const { db } = await connectToDatabase()
    // check if email existed
    const donor = {
      name: data.name,
      url_image: data.url_image,
      email: data.email,
      method: 'google',
      password: data.password,
      active: true,
      phone: data.phone,
      address: {
        ...data.address
      }
    }
    const donate = {
      id_association: data.id_association,
      id_user: data._id,
      name: data.name,
      url_image: data.url_image,
      email: data.email,
      phone: data.phone,
      address: {
        ...data.address
      },
      date: data.date,
      hour: data.hour,
      donates: data.donates,
      withdrawn: false
    }

    const { id } = data
    const _id = new ObjectId(String(id))

    const success = await db.collection('donates').insertOne(donate)

    const response = await db
      .collection('donors')
      .findOneAndUpdate({ _id }, { $set: data }, { returnDocument: 'after' })
    res.status(201).json({
      user: response
    })
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
