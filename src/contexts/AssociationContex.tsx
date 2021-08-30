import { createContext, ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'

import { api } from '../services/api'

export type AssociationProps = {
  _id: string
  name: string
  email: string
  director: string
  phone: string
  address: {
    street: string
    number: string
    district: string
  }
  id_city: string
  since: string
  people_assisted: string
  password: string
  facebook: string
  instagram: string
  url_image: string
  description: string
  about: string
  active: boolean
}

type SignInCredentials = {
  email: string
  password: string
}

interface AssociationContextData {
  association: AssociationProps
  updatedAssociation: (association: AssociationProps) => void
  fetchAssociation: (email: string) => void
  setAssociation: (data: AssociationProps) => void
}

interface AssociationProviderProps {
  children: ReactNode
}

export const AssociationContext = createContext({} as AssociationContextData)

export function AssociationProvider({ children }: AssociationProviderProps) {
  const [association, setAssociation] = useState<AssociationProps>()
  const [session, loading] = useSession()
  const email = session?.user.email
  async function fetchAssociation(email) {
    const response = await api.get(`/profile/email/${email}`)

    setAssociation(response.data)
  }

  useEffect(() => {
    fetchAssociation(email)
  }, [session])

  async function updatedAssociation(data) {
    const response = await api.post(
      `/associations/updated/${association._id}`,
      data
    )
    setAssociation(response.data)
  }

  return (
    <AssociationContext.Provider
      value={{
        association,
        updatedAssociation,
        fetchAssociation,
        setAssociation
      }}
    >
      {children}
    </AssociationContext.Provider>
  )
}
