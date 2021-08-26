import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { compare } from 'bcryptjs'
import connectToDatabase from 'utils/database'
type CredentialsProps = {
  credentials: {
    email: string
    password: string
  }
}
export default NextAuth({
  //Configure JWT
  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  secret: process.env.JWT_SECRET,
  //Specify Provider
  providers: [
    Providers.Credentials({
      id: 'association',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'e-mail' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        //Connect to DB
        const { db } = await connectToDatabase()
        //Get all the users
        const result = await db.collection('associations').findOne({
          email: credentials.email
        })
        //Not found - send error res

        if (!result) {
          throw new Error('E-mail invalido ou não cadastrado')
        }
        //Check hased password with DB password
        const checkPassword = await compare(
          credentials.password,
          result.password
        )
        //Incorrect password - send response
        if (!checkPassword) {
          throw new Error('Senha está Incorreta')
        }
        const user = {
          id: result._id.toString(),
          image: result.url_image,
          name: result.name,
          email: result.email,
          director: result.director
        }

        //Else send success client.close()
        return user
      }
    }),

    Providers.Credentials({
      id: 'donor',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'e-mail' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        //Connect to DB
        const { db } = await connectToDatabase()
        //Get all the users
        const result = await db.collection('donors').findOne({
          email: credentials.email
        })
        //Not found - send error res

        if (!result) {
          throw new Error('E-mail invalido ou não cadastrado')
        }
        //Check hased password with DB password
        const checkPassword = await compare(
          credentials.password,
          result.password
        )
        //Incorrect password - send response
        if (!checkPassword) {
          throw new Error('Senha está Incorreta')
        }
        const user = {
          id: result._id.toString(),
          image: result.url_image,
          name: result.name,
          email: result.email,
          director: result.director
        }

        //Else send success client.close()
        return user
      }
    })
  ]
})
