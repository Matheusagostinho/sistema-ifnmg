import dynamic from 'next/dynamic'

import {
  Link as ChakraLink,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Spinner,
  Stack,
  Table,
  Td,
  Text,
  Th,
  Thead,
  theme,
  Tr,
  useBreakpointValue,
  Tbody,
  IconButton
} from '@chakra-ui/react'
import { Header } from '../../components/HeaderAdmin'
import { Sidebar } from '../../components/Sidebar'
import Link from 'next/link'
import {
  RiAddLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiPencilLine
} from 'react-icons/ri'
import { useState } from 'react'
import { useUsers } from 'services/hooks/useUsers'
import { queryClient } from 'services/queryClient'
import { api } from 'services/api'
import { Pagination } from 'components/Pagination'
import { getSession, signOut } from 'next-auth/client'
import connectToDatabase from 'utils/database'

export default function Dashboard() {
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
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" mt="20" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Stack
          flex="1"
          marginLeft={['0', '0', '0', '230px', '250px']}
          display="flex"
          flexDir="column"
          spacing="6"
          my="6"
        >
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="232px"
            alignItems="flex-start"
          >
            <Box
              px={['4', '6']}
              py={['2', '4']}
              bg="gray.1"
              borderRadius={8}
              borderColor="gray.300"
              borderWidth="1px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="lg" mb="2" color="gray.400">
                Doações a Receber
              </Text>
              <Heading size="3xl" mb="0">
                15
              </Heading>
            </Box>
            <Box
              px={['4', '6']}
              py={['2', '4']}
              bg="gray.1"
              borderRadius={8}
              borderColor="gray.300"
              borderWidth="1px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="lg" mb="2" color="gray.400">
                Doações Recebidas
              </Text>
              <Heading size="3xl" mb="0">
                237
              </Heading>
            </Box>
            <Box
              px={['4', '6']}
              py={['2', '4']}
              bg="gray.1"
              borderRadius={8}
              borderColor="gray.300"
              borderWidth="1px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="lg" mb="2" color="gray.400">
                Doadores
              </Text>
              <Heading size="3xl" mb="0">
                167
              </Heading>
            </Box>
            <Box
              px={['4', '6']}
              py={['2', '4']}
              bg="gray.1"
              borderRadius={8}
              borderColor="gray.300"
              borderWidth="1px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="lg" mb="2" color="gray.400">
                Famílias Auxiliadas
              </Text>
              <Heading size="3xl" mb="0">
                62
              </Heading>
            </Box>
          </SimpleGrid>

          <Box
            flex="1"
            bg="gray.1"
            borderRadius={8}
            p={['4', '6', '8']}
            marginLeft={['0', '0', '0', '230px', '250px']}
            borderColor="gray.300"
            borderWidth="1px"
          >
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Doações a receber
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="gray.500" ml="4" />
                )}
              </Heading>
              {/* <Link href="/admin/doadores/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="red"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Agendar doação
                </Button>
              </Link> */}
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
                <Table colorScheme="blackAlpha" p="2">
                  <Thead>
                    <Tr>
                      {isWideVersion && (
                        <Th px={['4', '4', '6']} color="gray.300" width="8">
                          <Checkbox colorScheme="red" />
                        </Th>
                      )}
                      <Th>Doadores</Th>
                      {isWideVersion && <Th>Data da retirada</Th>}
                      <Th width="5"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.users.map(user => {
                      return (
                        <Tr key={user.id}>
                          {isWideVersion && (
                            <Td px={['4', '4', '6']}>
                              <Checkbox colorScheme="red" />
                            </Td>
                          )}
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
                          {isWideVersion && <Td>{user.createdAt}</Td>}
                          {isWideVersion ? (
                            <Td>
                              <Flex
                                flexDirection="row"
                                justifyContent="flex-end"
                              >
                                <Button
                                  as="a"
                                  size="sm"
                                  fontSize="sm"
                                  colorScheme="green"
                                  mr="1"
                                  leftIcon={
                                    <Icon
                                      as={RiCheckboxCircleLine}
                                      fontSize="16"
                                    />
                                  }
                                >
                                  Retirado
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
                                  aria-label="Retirado"
                                  as="a"
                                  size="sm"
                                  fontSize="sm"
                                  colorScheme="green"
                                  mr="1"
                                  borderRadius="6"
                                  icon={
                                    <Icon
                                      as={RiCheckboxCircleLine}
                                      fontSize="16"
                                    />
                                  }
                                />
                              </Flex>
                            </Td>
                          )}
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
          </Box>
          <Box
            flex="1"
            bg="gray.1"
            borderRadius={8}
            p={['4', '6', '8']}
            marginLeft={['0', '0', '0', '230px', '250px']}
            borderColor="gray.300"
            borderWidth="1px"
          >
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Doações recebidas
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="gray.500" ml="4" />
                )}
              </Heading>
              {/* <Link href="/admin/doadores/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="red"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Agendar doação
                </Button>
              </Link> */}
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
                <Table colorScheme="blackAlpha" p="2">
                  <Thead>
                    <Tr>
                      <Th>Doadores</Th>
                      <Th>Data da doação</Th>
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
                          <Td>{user.createdAt}</Td>
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
          </Box>
        </Stack>
      </Flex>
    </Flex>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }

  // const email = session?.user.email
  // const { db } = await connectToDatabase()
  // const response = await db.collection('associations').findOne({ email })

  // if (!session || !response) {
  //   return {
  //     redirect: {
  //       destination: '/admin',
  //       permanent: false
  //     }
  //   }
  // }
  return {
    props: { session }
  }
}
