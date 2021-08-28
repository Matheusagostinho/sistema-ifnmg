import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { api } from '../api'

type Donates = {
  _id: string
  name: string
  email: string
  url_image: string
  phone: string
  address: {
    street: string
    district: string
    number: string
    city: string
    uf: string
  }
  date: string
  hour: string
  donate: string
  withdrawn: boolean
}

type GetUsersResponse = {
  completedDonates: Donates[]
  donates: Donates[]
  totalCount: number
  totalDonors: number
}

export async function getDonates(
  id: string,
  page = 1
): Promise<GetUsersResponse> {
  const { data } = await api.get(`donates/all/${id}`)
  const per_page = 10
  const allDonors = data.reduce((object, item) => {
    if (!object[item.email]) {
      object[item.email] = 1
    } else {
      object[item.email]++
    }
    return object
  }, {})
  const totalDonors = Object.keys(allDonors).length

  const donates =
    data.filter(donate => {
      if (!donate.withdrawn)
        return {
          _id: donate._id,
          name: donate.name,
          email: donate.email,

          url_image: donate.url_image,
          phone: donate.phone,
          address: {
            street: donate.address.street,
            district: donate.address.district,
            number: donate.address.number,
            city: donate.address.city,
            uf: donate.address.uf
          },
          date: new Date(donate.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          }),
          hour: donate.hour,
          donate: donate.donate,
          withdrawn: donate.withdrawn
        }
    }) || null

  const completedDonatesAll =
    data.filter(donate => {
      if (donate.withdrawn)
        return {
          id: donate._id,
          name: donate.name,
          email: donate.email,

          url_image: donate.url_image,
          phone: donate.phone,
          address: {
            street: donate.address.street,
            district: donate.address.district,
            number: donate.address.number,
            city: donate.address.city,
            uf: donate.address.uf
          },
          date: new Date(donate.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          }),
          hour: donate.hour,
          donate: donate.donate,
          withdrawn: donate.withdrawn
        }
    }) || null

  const totalCount = completedDonatesAll.length

  const pageStart = (Number(page) - 1) * Number(per_page)
  const pageEnd = pageStart + Number(per_page)
  const completedDonates =
    completedDonatesAll.length > 0
      ? completedDonatesAll.slice(pageStart, pageEnd)
      : null

  return {
    donates,
    completedDonates,
    totalCount,
    totalDonors
  }
}

export function useDonates(id: string, page = 1, options?: UseQueryOptions) {
  return useQuery(['donates', page], () => getDonates(id, page), {
    staleTime: 1000 * 60 * 10, // 10 minutos
    ...options
  }) as UseQueryResult<GetUsersResponse, unknown>
}
