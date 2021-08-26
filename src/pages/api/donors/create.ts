import { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from 'utils/database'
import bcrypt from 'bcryptjs'
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
    const user = await db.collection('donors').findOne({ email })

    if (!user && data.method === 'google') {
      const donor = {
        ...data,
        password: '',
        active: true,
        method: 'google',
        phone: '',
        address: {
          street: '',
          number: '',
          district: '',
          city: '',
          uf: ''
        }
      }
      const { insertedId } = await db.collection('donors').insertOne(donor)
      const _id = new ObjectId(String(insertedId))
      const newDonor = await db.collection('donors').findOne(donor)
      res.status(201).json({
        donor: newDonor
      })
    } else if (user && data.method === 'google') {
      res.status(201).json({
        donor: user
      })
    } else if (data.method === 'email' && user.method === 'google') {
      const hashedPassword = await bcrypt.hash(data.password, 10)
      const donor = {
        ...data,
        password: hashedPassword,
        active: true
      }
      const _id = user._id
      const userNew = await db
        .collection('donors')
        .findOneAndUpdate({ _id }, { $set: donor }, { returnDocument: 'after' })
      res.status(201).json({
        user: userNew
      })
    } else {
      res.status(409).send('Você já possui um cadastro')
    }
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
