import {
  Box,
  Flex,
  Icon,
  IconButton,
  InputRightElement,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  HStack,
  Stack,
  Divider,
  Heading,
  OrderedList,
  ListItem
} from '@chakra-ui/react'
import { Button } from 'components/Form/Button'
import { Input } from 'components/Form/Input'
import { InputRef } from 'components/Form/InputRef'
import { Textarea } from 'components/Form/Textarea'
import { Layout } from 'components/Layout'
import { Pagination } from 'components/Pagination'
import Router from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiSearch } from 'react-icons/bi'
import { IoIosArrowForward, IoMdAdd } from 'react-icons/io'
import { RiDeleteBin6Line, RiErrorWarningLine } from 'react-icons/ri'
import styles from '../../styles/table.module.scss'

type ModalityProps = {
  name: string
  description: string
}
export default function Edicts() {
  const isLoading = false
  const error = false
  const router = Router
  const [page, setPage] = useState(1)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalities, setModalities] = useState<ModalityProps[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm()
  function addNewModality() {
    const modality = {
      name: watch('nameModality'),
      description: watch('descriptionModality')
    }
    setModalities([...modalities, modality])
    console.log(modalities)
    setValue('nameModality', '')
    setValue('descriptionModality', '')
  }
  const students = [
    {
      id: '1',
      name: 'Auxílio Emergencial Covid',
      year: '2020',
      number: '25511542'
    },
    {
      id: '2',
      name: 'Auxílio Emergencial Covid 2019',
      year: '2020',
      number: '25445214'
    },
    {
      id: '3',
      name: 'Auxílio Emergencial Covid 2019',
      year: '2020',
      number: '74452217'
    }
  ]
  function handleNewStudent(e) {
    e.preventDefault()
    router.push('/students/new')
  }
  function handleSeeHistory(e, id: string) {
    e.preventDefault()
    router.push(`/students/${id}`)
  }
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
    <Layout>
      <Box
        display="flex"
        mt={['-142px', '-142px', '-78px']}
        w={['320px', '380px', '860px']}
        flexDir={['column', 'column', 'row']}
      >
        <Input
          name="name"
          placeholder="Digite o nome do auxilio"
          label="Procurar por edital"
        >
          <InputRightElement width="3.5rem">
            <IconButton
              aria-label="Search database"
              variant="link"
              colorScheme="purple"
              icon={<BiSearch />}
            />
          </InputRightElement>
        </Input>
      </Box>
      <Box
        h="100px"
        w="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          type="button"
          size="lg"
          rightIcon={<Icon as={IoMdAdd} />}
          onClick={onOpen}
        >
          Adicionar Edital
        </Button>
      </Box>
      <Box w="100%">
        {isLoading ? (
          <Flex justify="center">
            <Spinner size="md" color="gray.500" />
          </Flex>
        ) : error ? (
          <Flex justify="center">
            <Text>Falha ao obter dados</Text>
          </Flex>
        ) : 1 > 0 ? (
          <>
            <Table
              className={styles.table}
              style={{ borderCollapse: 'separate' }}
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th>Edital</Th>

                  <Th>Curso</Th>
                  {isWideVersion && <Th>Nº</Th>}
                  <Th width="3"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {students.map(student => {
                  return (
                    <Tr
                      key={student?.id}
                      bgColor="gray.1"
                      borderColor="pink.200"
                    >
                      <Td>
                        <Text fontWeight="bold">{student?.name}</Text>
                      </Td>
                      <Td>
                        <Text>{student?.year}</Text>
                      </Td>

                      {isWideVersion && <Td>{student?.number}</Td>}

                      {isWideVersion ? (
                        <Td px={['1', '2']}>
                          <Flex flexDirection="row" justifyContent="flex-end">
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              bgColor="green.100"
                              mr="1"
                              type="button"
                              onClick={e => handleSeeHistory(e, student?.id)}
                              cursor="pointer"
                              _hover={{
                                backgroundColor: 'var(--green-300)'
                              }}
                              rightIcon={
                                <Icon as={IoIosArrowForward} fontSize="18" />
                              }
                            >
                              Ver Mais
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
                              aria-label="Ver Histórico"
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="green"
                              bgColor="green.100"
                              _hover={{
                                backgroundColor: 'var(--green-300)'
                              }}
                              mr="1"
                              //onClick={() => makeAsWithdrawn(donate._id)}
                              borderRadius="6"
                              icon={
                                <Icon as={IoIosArrowForward} fontSize="16" />
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
          <Text> Não Existe Editais cadastrado</Text>
        )}
      </Box>
      <Box w="100%">
        <Pagination
          totalCountOfRegisters={25}
          currentPage={page}
          onPageChange={setPage}
        />
      </Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent bgColor="gray.1">
          <ModalBody pb={6}>
            <Box p="6">
              <Heading fontSize="22">Dados do Edital</Heading>
              <Divider mb="6" mt="2" />
              <Stack spacing="6" w="100%">
                <Input
                  isBgWhite
                  type="text"
                  name="complement"
                  colorLabel="gray.500"
                  label="Nome do Edital"
                />
                <Input
                  isBgWhite
                  type="text"
                  name="complement"
                  colorLabel="gray.500"
                  label="Numero do Edital"
                />
                <Input
                  isBgWhite
                  type="text"
                  name="complement"
                  colorLabel="gray.500"
                  label="Ano do Edital"
                />
                <Textarea
                  h="100px"
                  size="lg"
                  isBgWhite
                  name="notations"
                  colorLabel="gray.500"
                  label="Descrição"
                />
              </Stack>
              <Heading mt="6" fontSize="22">
                Modalidades do Edital
              </Heading>
              <Divider mb="6" mt="2" />
              <Stack spacing="6" w="100%">
                <InputRef
                  isBgWhite
                  type="text"
                  name="nameModality"
                  colorLabel="gray.500"
                  label="Nome da modalidade"
                  {...register('nameModality')}
                />
                <InputRef
                  isBgWhite
                  type="text"
                  name="descriptionModality"
                  colorLabel="gray.500"
                  label="Descrição da modalidade"
                  {...register('descriptionModality')}
                />
              </Stack>
              <Box display="flex" justifyContent="right" w="100%" mt="4">
                <Button
                  as="a"
                  size="md"
                  fontSize="md"
                  w="40%"
                  type="button"
                  _hover={{
                    color: 'var(--gray-100)'
                  }}
                  onClick={() => addNewModality()}
                  cursor="pointer"
                  leftIcon={<Icon as={IoMdAdd} fontSize="18" />}
                >
                  Adicionar
                </Button>
              </Box>
              <Box w="100%" mt="6">
                <OrderedList>
                  {modalities.map(modality => (
                    <ListItem>
                      {modality.name}
                      <IconButton
                        ml="2"
                        cursor="pointer"
                        aria-label="Excluir"
                        variant="ghost"
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="red"
                        mr="1"
                        borderRadius="6"
                        icon={<Icon as={RiDeleteBin6Line} fontSize="16" />}
                        _hover={{
                          bgColor: 'var(--gray-100)',
                          color: 'var(--chakra-colors-red-600)'
                        }}
                      />
                    </ListItem>
                  ))}
                </OrderedList>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter p="0" ml="0">
            <Box
              bgColor="gray.100"
              h="130px"
              mx="0"
              w="100%"
              borderBottomRadius="8"
              borderTop="1px"
              borderTopColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding="8"
            >
              <Box flex="1" display="flex" alignItems="center">
                <Icon
                  as={RiErrorWarningLine}
                  fontSize="32"
                  marginRight="4"
                  color="purple.100"
                ></Icon>
                <Text color="gray.400" fontWeight="light">
                  Importante!<br></br> Preencha todos os dados
                </Text>
              </Box>
              <HStack display="flex">
                <Button
                  as="a"
                  size="lg"
                  fontSize="md"
                  bgColor="red.400"
                  colorScheme="red"
                  w="100%"
                  type="button"
                  onClick={onClose}
                  cursor="pointer"
                >
                  Cancelar
                </Button>
                <Button
                  as="a"
                  size="lg"
                  fontSize="md"
                  bgColor="green.100"
                  w="100%"
                  type="button"
                  onClick={onClose}
                  cursor="pointer"
                  _hover={{
                    backgroundColor: 'var(--green-300)',
                    color: 'var(--gray-100)'
                  }}
                >
                  Salvar
                </Button>
              </HStack>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  )
}
