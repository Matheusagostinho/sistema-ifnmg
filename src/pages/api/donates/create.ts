import { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from 'utils/database'
import { ObjectId } from 'mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body

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
        street: data.street,
        district: data.district,
        number: data.number,
        city: data.city,
        uf: data.uf
      }
    }
    const donate = {
      id_association: data.id_association,
      id_user: data.id,
      name: data.name,
      url_image: data.url_image,
      email: data.email,
      phone: data.phone,
      address: {
        street: data.street,
        district: data.district,
        number: data.number,
        city: data.city,
        uf: data.uf
      },
      date: data.date,
      hour: data.hour,
      donate: data.donate,
      withdrawn: false
    }

    const _id = new ObjectId(String(data.id))

    const success = await db.collection('donates').insertOne(donate)

    const { value } = await db
      .collection('donors')
      .findOneAndUpdate({ _id }, { $set: donor }, { returnDocument: 'after' })

    res.status(201).json({
      user: value,
      donate: success
    })
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
