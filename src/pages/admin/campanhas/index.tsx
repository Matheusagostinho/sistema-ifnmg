import {
  Link as ChakraLink,
  Box,
  Button,
  IconButton,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Spinner,
  Switch
} from '@chakra-ui/react'

import { RiAddLine, RiCloseCircleLine, RiPencilLine } from 'react-icons/ri'

import { Pagination } from '../../../components/Pagination'
import { useUsers } from '../../../services/hooks/useUsers'

import { queryClient } from '../../../services/queryClient'
import { api } from '../../../services/api'
import { useState } from 'react'
import Link from 'next/link'
import { LayoutOutAdmin } from 'components/LayoutAdmin'

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type UserListProps = {
  users: User[]
  totalCount: number
}
export default function campaignList() {
  const [page, setPage] = useState(1)
  //refetch - para fazer o refetch dos dados
  const { data, isLoading, isFetching, error } = useUsers(page, {
    // initialData:
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const res = await api.get(`users/${userId}`)

        return res.data
      },
      {
        staleTime: 1000 * 60 * 10 // 10 minutos
      }
    )
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
    <LayoutOutAdmin>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Campanhas
          {!isLoading && isFetching && (
            <Spinner size="sm" color="gray.500" ml="4" />
          )}
        </Heading>
        <Link href="/admin/doadores/create" passHref>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="red"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          >
            Criar Nova
          </Button>
        </Link>
      </Flex>
      {isLoading ? (
        <Flex justify="center">
          <Spinner size="md" color="gray.500" />
        </Flex>
      ) : error ? (
        <Flex justify="center">
          <Text>Falha ao obter dados</Text>
        </Flex>
      ) : (
        <>
          <Table colorScheme="blackAlpha" p={['0', '2']}>
            <Thead>
              <Tr>
                <Th>Descrição</Th>
                <Th width="1" mx={['-2']}></Th>
                <Th width="1">Ativa</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.users.map(user => {
                return (
                  <Tr key={user.id}>
                    <Td>
                      <Box>
                        <ChakraLink
                          color="red.500"
                          onMouseEnter={() => handlePrefetchUser(user.id)}
                        >
                          <Text fontWeight="bold">{user.name}</Text>
                        </ChakraLink>
                        <Text fontSize="sm" color="gray.400">
                          {user.email}
                        </Text>
                      </Box>
                    </Td>

                    {isWideVersion ? (
                      <Td>
                        <Flex flexDirection="row" justifyContent="flex-end">
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="blue"
                            mr="1"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                          </Button>
                        </Flex>
                      </Td>
                    ) : (
                      <Td px="2">
                        <Flex
                          flexDirection="row"
                          justifyContent="flex-end"
                          w="100%"
                        >
                          <IconButton
                            aria-label="Editar"
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="blue"
                            mr="1"
                            borderRadius="6"
                            icon={<Icon as={RiPencilLine} fontSize="16" />}
                          />
                        </Flex>
                      </Td>
                    )}
                    <Td>
                      <Switch defaultChecked colorScheme="red" />
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
          <Pagination
            totalCountOfRegisters={data.totalCount}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}
    </LayoutOutAdmin>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1)

//   return {
//     props: {
//       users,
//       totalCount
//     }
//   }
// }
