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
  Tr,
  useBreakpointValue,
  Tbody,
  IconButton,
  Avatar,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { Header } from '../../components/HeaderAdmin'
import { Sidebar } from '../../components/Sidebar'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { Donate, useDonates } from 'services/hooks/useDonates'
import { queryClient } from 'services/queryClient'
import { api } from 'services/api'
import { Pagination } from 'components/Pagination'
import { getSession } from 'next-auth/client'
import connectToDatabase from 'utils/database'
import { useMutation } from 'react-query'
import { database } from 'services/firebase'
import { ModalDonate } from 'components/ModalDonate'

type FirebaseDonations = Record<
  string,
  {
    donates: Record<
      string,
      {
        isNewDonateId: string
      }
    >
  }
>

export default function Dashboard({ id, numberOfFamily }) {
  const [page, setPage] = useState(1)
  const toast = useToast()
  const [donateInformation, setDonateInformation] = useState<Donate>(
    {} as Donate
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  //refetch - para fazer o refetch dos dados
  const { data, isLoading, isFetching, error, refetch } = useDonates(id, page, {
    // initialData:
  })

  const donateModify = useMutation(
    async (id_donate: string) => {
      const res = await api.post(`donates/updated/${id_donate}`, {})

      return res.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('donates')
        refetch()
      }
    }
  )
  const makeAsWithdrawn = async (id_donate: string) => {
    onClose()
    const data = await donateModify.mutateAsync(id_donate)
    toast({
      title: 'O Agendamento foi marcado como retirado!',
      status: 'success',
      isClosable: true,
      position: 'top-right'
    })
    refetch()
  }

  const [newDonate, setNewDonate] = useState(0)

  useEffect(() => {
    const associationRef = database.ref(`associations/${id}`)

    associationRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseDonations = databaseRoom?.donates ?? {}
      const count = Object.entries(firebaseQuestions).length
      setNewDonate(count)
    })

    refetch()

    return () => {
      associationRef.off('value')
    }
  }, [newDonate])

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  function openModalDonate(donate: Donate) {
    setDonateInformation(donate)
    onOpen()
  }
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
                {data?.donates.length || 0}
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
                Total de Doações
              </Text>
              <Heading size="3xl" mb="0">
                {newDonate}
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
                {data?.totalDonors || 0}
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
                {numberOfFamily}
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
              <Heading size="lg" fontWeight="normal" ml="2">
                Doações a receber
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="gray.500" ml="4" />
                )}
              </Heading>
            </Flex>
            {isLoading ? (
              <Flex justify="center">
                <Spinner size="md" color="gray.500" />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados</Text>
              </Flex>
            ) : data.donates.length > 0 ? (
              <>
                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      {isWideVersion && (
                        <Th
                          px={['4', '4', '6']}
                          color="gray.300"
                          width="3"
                        ></Th>
                      )}
                      <Th>Doadores</Th>
                      {isWideVersion && <Th>Data da retirada</Th>}
                      <Th width="3"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.donates.map(donate => {
                      return (
                        <Tr key={donate?._id}>
                          {isWideVersion && (
                            <Td px={['4', '4', '6']}>
                              <Avatar
                                src={donate.url_image}
                                name={donate.name}
                              />
                            </Td>
                          )}
                          <Td>
                            <Box>
                              <ChakraLink
                                color="red.500"
                                onClick={() => openModalDonate(donate)}
                              >
                                <Text fontWeight="bold">{donate?.name}</Text>
                              </ChakraLink>
                              <Text fontSize="sm" color="gray.400">
                                {donate?.address.street}...
                              </Text>
                            </Box>
                          </Td>

                          {isWideVersion && (
                            <Td>
                              <Box
                                display={['column', 'flex']}
                                alignItems="center"
                              >
                                {donate?.date}
                                <Box display="flex">
                                  <Text mx="1" color="gray.400">
                                    às
                                  </Text>
                                  {donate.hour}h
                                </Box>
                              </Box>
                            </Td>
                          )}

                          {isWideVersion ? (
                            <Td px={['1', '2']}>
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
                                  type="button"
                                  onClick={() => makeAsWithdrawn(donate._id)}
                                  cursor="pointer"
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
                            <Td px="1">
                              <Flex
                                flexDirection="row"
                                justifyContent="flex-end"
                                w="100%"
                              >
                                <IconButton
                                  cursor="pointer"
                                  aria-label="Retirado"
                                  as="a"
                                  size="sm"
                                  fontSize="sm"
                                  colorScheme="green"
                                  mr="1"
                                  onClick={() => makeAsWithdrawn(donate._id)}
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
              </>
            ) : (
              <Text> Não possui doações agendadas</Text>
            )}
          </Box>
          {data?.completedDonates && (
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
                        {isWideVersion && <Th>Doações</Th>}
                        <Th>Data da doação</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.completedDonates.map(donate => {
                        return (
                          <Tr key={donate?._id}>
                            <Td>
                              <Box>
                                <ChakraLink
                                  color="gray.700"
                                  onClick={() => openModalDonate(donate)}
                                >
                                  <Text fontWeight="bold">{donate?.name}</Text>
                                </ChakraLink>
                                <Text fontSize="sm" color="gray.400">
                                  {donate?.address.street}...
                                </Text>
                              </Box>
                            </Td>
                            {isWideVersion && <Td>{donate?.donate}</Td>}
                            <Td>{donate?.date}</Td>
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
          )}
        </Stack>
      </Flex>
      <ModalDonate
        makeAsWithdrawn={makeAsWithdrawn}
        isOpen={isOpen}
        onClose={onClose}
        infoDonate={donateInformation}
      />
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

  const email = session?.user.email
  const { db } = await connectToDatabase()
  const response = await db.collection('associations').findOne({ email })

  const id = String(response._id)
  const numberOfFamily = response.people_assisted

  // if (!session || !response) {
  //   return {
  //     redirect: {
  //       destination: '/admin',
  //       permanent: false
  //     }
  //   }
  // }
  return {
    props: { id, numberOfFamily }
  }
}
