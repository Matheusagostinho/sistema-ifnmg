import { createContext, ReactNode, useEffect, useState } from 'react'
import Router from 'next/router'
import { signIn, getSession, signOut, useSession } from 'next-auth/client'

import { api } from '../services/api'

type Association = {
  email: string
}

type SignInCredentials = {
  email: string
  password: string
}

interface AssociationContextData {
  association: Association
}

interface AssociationProviderProps {
  children: ReactNode
}

export const AssociationContext = createContext({} as AssociationContextData)

export function AssociationProvider({ children }: AssociationProviderProps) {
  const [association, setAssociation] = useState<Association>()
  const [session, loading] = useSession()
  const email = session?.user.email

  useEffect(() => {
    async function fetchAssociation() {
      const response = await api.get(`/profile/email/${email}`)

      setAssociation(response.data)
      console.log(response.data)
    }
    if (email) {
      fetchAssociation()
    }
  }, [session])

  return (
    <AssociationContext.Provider value={{ association }}>
      {children}
    </AssociationContext.Provider>
  )
}
