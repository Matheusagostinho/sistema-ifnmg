import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { api } from '../api'

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type GetUsersResponse = {
  users: User[]
  totalCount: number
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  // const { data, headers } = await api.get('users', {
  //   params: {
  //     page
  //   }
  // })

  const totalCount = Number('20')

  // const users = data.users.map(user => {
  //   return {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
  //       day: '2-digit',
  //       month: 'long',
  //       year: 'numeric'
  //     })
  //   }
  // })

  const users = [
    {
      id: '1',
      name: 'Matheus Agostinho',
      email: 'henrique.matheus28@gmail.com',
      createdAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    },
    {
      id: '2',
      name: 'Henrique Ozorio',
      email: 'henrique.matheus28@gmail.com',
      createdAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  ]

  return {
    users,
    totalCount
  }
}

export function useUsers(page: number, options?: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutos
    ...options
  }) as UseQueryResult<GetUsersResponse, unknown>
}
