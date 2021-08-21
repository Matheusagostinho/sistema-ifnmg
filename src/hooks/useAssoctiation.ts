import { useContext } from 'react'
import { AssociationContext } from '../contexts/AssociationContex'

export function useAssociation() {
  const value = useContext(AssociationContext)

  return value
}
