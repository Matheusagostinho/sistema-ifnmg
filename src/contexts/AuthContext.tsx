import { useToast } from '@chakra-ui/react'
import { AxiosResponse } from 'axios'
import router from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from 'services/api'
import { auth, firebase } from '../services/firebase'

type Donor = {
  _id?: string
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    number: string
    district: string
    city: string
    uf: string
  }
  password?: string
  url_image: string
  method: string
}

type AuthContextType = {
  user: Donor | undefined
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  fetchDonor: (email: string) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<Donor>()
  const toast = useToast()
  async function fetchDonor(email) {
    const response = await api.get(`/donors/email/${email}`)

    setUser(response.data)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid, email } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        fetchDonor(email)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      await firebase.auth().signOut()
    } finally {
      setUser(null)
    }
  }

  async function createDonor(data: Donor) {
    try {
      const response = await api.post('/donors/create', data)
      setUser(response.data.donor)
      console.log(response.data.donor)
      if (response.status === 201 && data.method == 'email') {
        toast({
          title: `Cadastro feito com sucesso`,
          status: 'success',
          isClosable: true,
          position: 'top-right'
        })
      }

      return
    } catch (err) {
      if (err.response.status === 409 && data.method == 'email') {
        toast({
          title: `E-mail já cadastrado`,
          status: 'warning',
          isClosable: true,
          position: 'top-right'
        })
        return
      }
    }
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      const donor = {
        name: displayName,
        url_image: photoURL,
        email,
        method: 'google'
      }
      createDonor(donor)
      console.log(user)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signOut, fetchDonor }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
