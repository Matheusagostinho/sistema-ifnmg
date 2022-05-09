import {
  Avatar,
  Box,
  Flex,
  Icon,
  IconButton,
  InputGroup,
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
  Link as ChakraLink,
  StylesProvider
} from '@chakra-ui/react'
import { Button } from 'components/Form/Button'
import { Input } from 'components/Form/Input'
import { Select } from 'components/Form/Select'
import { Layout } from 'components/Layout'
import { Pagination } from 'components/Pagination'
import Router from 'next/router'
import { useState } from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io'
import styles from '../../styles/table.module.scss'
export default function Students() {
  const isLoading = false
  const error = false
  const router = Router
  const [page, setPage] = useState(1)
  const students = [
    {
      id: '1',
      name: 'Matheus Agostinho',
      curse: 'Sistemas de Informação',
      edital: 'Auxílio Emergencial Covid 2019'
    },
    {
      id: '2',
      name: 'Lucas Vieira',
      curse: 'Engenharia Civil',
      edital: 'Auxílio Emergencial Covid 2019'
    },
    {
      id: '3',
      name: 'Pablo Henrique',
      curse: 'Administração ',
      edital: 'Auxílio Emergencial Covid 2019'
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
        <Select
          mr={['0', '0', '4']}
          name="edict"
          label="Selecionar Edital"
          w={['100%', '100%', '238px']}
        >
          <option value="option1">Auxilio Emergencial Covid...</option>
          <option value="option2">Auxilio Emergencial Covid...</option>
          <option value="option3">Auxilio Emergencial Covid...</option>
        </Select>
        <Select
          mr={['0', '0', '4']}
          name="edict"
          label="Selecionar Curso"
          w={['100%', '100%', '238px']}
        >
          <option value="option1">Sistemas de Informação</option>
          <option value="option2">Administração</option>
          <option value="option3">Engenharia Civil</option>
        </Select>
        <Input
          name="name"
          placeholder="Digite o nome do Aluno(a)"
          label="Procurar por Aluno"
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
          rightIcon={<Icon as={AiOutlineUserAdd} />}
          onClick={e => handleNewStudent(e)}
        >
          Adicionar Aluno
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
                  <Th>Nome</Th>

                  <Th>Curso</Th>
                  {isWideVersion && <Th>Edital</Th>}
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
                        <Text>{student?.curse}</Text>
                      </Td>

                      {isWideVersion && <Td>{student?.edital}</Td>}

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
                              Ver Histórico
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
          <Text> Não Alunos Cadastrados</Text>
        )}
      </Box>
      <Box w="100%">
        <Pagination
          totalCountOfRegisters={60}
          currentPage={page}
          onPageChange={setPage}
        />
      </Box>
    </Layout>
  )
}
