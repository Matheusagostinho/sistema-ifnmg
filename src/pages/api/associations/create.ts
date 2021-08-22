import { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from 'utils/database'
import bcrypt from 'bcryptjs'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body
    console.log(data)

    const email = req.body.email // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same

    if (!data.name) {
      res.status(400).send('Missing field(s)')
    }
    const { db } = await connectToDatabase()
    // check if email existed
    if ((await db.collection('associations').countDocuments({ email })) > 0) {
      res.status(204).send('O Email já existe')
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 10)
      const association = {
        ...data,
        password: hashedPassword,
        since: '',
        url_image: '',
        description: '',
        about: '',
        people_assisted: '',
        facebook: '',
        instagram: '',
        active: true
      }
      const user = await db.collection('associations').insertOne(association)
      res.status(201).json({
        user: user
      })
    }
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
