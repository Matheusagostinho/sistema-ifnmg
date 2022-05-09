import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react'
import { Button } from 'components/Form/Button'
import { Input } from 'components/Form/Input'
import { Select } from 'components/Form/Select'
import { Textarea } from 'components/Form/Textarea'
import { Layout } from 'components/Layout'
import { useState } from 'react'

import { IoMdAdd } from 'react-icons/io'
import { RiDeleteBin6Line, RiErrorWarningLine } from 'react-icons/ri'

interface EdictsProps {
  id: string
  edital: string
  modality: string
  year: string
}

export default function NewStudent() {
  const [edicts, setEdicts] = useState<EdictsProps[]>([])
  const isLoading = false
  const error = false
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  function vinculityEdictinStudant() {
    const edict = {
      id: ' auxilio',
      edital: 'Auxilio Emergencial Covid',
      modality: 'Permanancia 01',
      year: '2019'
    }

    setEdicts([...edicts, edict])
  }

  return (
    <Layout>
      <Stack
        spacing={10}
        display="flex"
        justifyContent="start"
        alignItems="top"
        mt="-14"
        zIndex="base"
        direction={['column', 'column', 'row']}
        w={['100%', '100%', '120%']}
      >
        <Box bgColor="gray.1" w={['100%']} borderRadius="8" p="10" pb="0">
          <Heading fontSize="22"> Dados do aluno</Heading>
          <Divider mb="6" mt="2" />
          <Stack spacing="6" mb="10">
            <Input
              colorLabel="gray.500"
              label="Nome Completo"
              isBgWhite
              name="name"
            />
            <Input
              colorLabel="gray.500"
              label="Número da matricula"
              isBgWhite
              name="name"
            />
            <Input
              mask="(99) 9 9999-9999"
              type="text"
              colorLabel="gray.500"
              label="Telefone"
              isBgWhite
              name="name"
            />
            <Input colorLabel="gray.500" label="Rua" isBgWhite name="name" />
            <Box display="flex">
              <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                <GridItem colSpan={2} h="20">
                  <Input
                    isBgWhite
                    type="text"
                    name="numberAddress"
                    colorLabel="gray.500"
                    label="Numero"
                  />
                </GridItem>
                <GridItem colSpan={4} h="20">
                  <Input
                    isBgWhite
                    type="text"
                    name="bairro"
                    colorLabel="gray.500"
                    label="Bairro"
                  />
                </GridItem>
              </Grid>
            </Box>
            <Input
              isBgWhite
              type="text"
              name="complement"
              colorLabel="gray.500"
              label="Complemento"
            />
            <Box display="flex">
              <Grid templateColumns="repeat(8, 1fr)" gap={2}>
                <GridItem colSpan={6} h="20">
                  <Input
                    isBgWhite
                    type="text"
                    name="cidade"
                    colorLabel="gray.500"
                    label="Cidade"
                  />
                </GridItem>
                <GridItem colSpan={2} h="20">
                  <Input
                    isBgWhite
                    type="text"
                    name="uf"
                    colorLabel="gray.500"
                    label="UF"
                  />
                </GridItem>
              </Grid>
            </Box>
            <Textarea
              h="100px"
              size="lg"
              isBgWhite
              name="notations"
              colorLabel="gray.500"
              label="Observações sobre o aluno"
            />
          </Stack>
          <Heading fontSize="22">Curso do aluno</Heading>
          <Divider mb="6" mt="2" />
          <Stack spacing="6" mb="10" w="100%">
            <Select
              isBgWhite
              name="edict"
              label="Selecionar Curso"
              colorLabel="gray.500"
            >
              <option value="option1">Sistemas de Informação</option>
              <option value="option2">Administração</option>
              <option value="option3">Engenharia Civil</option>
            </Select>
            <Select
              isBgWhite
              name="edict"
              label="Ano, Módulo ou Período"
              colorLabel="gray.500"
            >
              <option value="option1">1º Período</option>
              <option value="option1">2º Período</option>
              <option value="option1">3º Período</option>
              <option value="option1">4º Período</option>
              <option value="option1">5º Período</option>
              <option value="option1">6º Período</option>
              <option value="option1">7º Período</option>
              <option value="option1">8º Período</option>
              <option value="option1">9º Período</option>
              <option value="option1">10º Período</option>
            </Select>
          </Stack>
          <Box
            bgColor="gray.50"
            h="180px"
            mx="-10"
            borderBottomRadius="8"
            borderTop="1px"
            borderTopColor="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="10"
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
                onClick={() => vinculityEdictinStudant()}
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
                onClick={() => vinculityEdictinStudant()}
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
        </Box>
        <Box w={['100%']}>
          <Box bgColor="gray.1" w={['100%']} borderRadius="8" p="10">
            <Heading fontSize="22"> Vincular a um edital</Heading>
            <Divider mb="6" mt="2" />
            <Stack spacing="6" mb="10" w="100%" position="relative">
              <Select
                w="80%"
                isBgWhite
                name="edict"
                label="Edital"
                colorLabel="gray.500"
              >
                <option value="option1">Auxilio Emergencial Covid...</option>
                <option value="option2">Auxilio Emergencial Covid...</option>
                <option value="option3">Auxilio Emergencial Covid...</option>
              </Select>
              <Select
                w="80%"
                isBgWhite
                name="edict"
                label="Modalidade do Auxilio"
                colorLabel="gray.500"
              >
                <option value="option1">Permanecia 01</option>
                <option value="option1">Permanecia 02</option>
                <option value="option1">Permanecia 03</option>
              </Select>
              <Button
                as="a"
                size="md"
                fontSize="md"
                bgColor="green.100"
                w="40%"
                type="button"
                position="absolute"
                right="0"
                bottom="-12"
                onClick={() => vinculityEdictinStudant()}
                cursor="pointer"
                _hover={{
                  backgroundColor: 'var(--green-300)'
                }}
                leftIcon={<Icon as={IoMdAdd} fontSize="18" />}
              >
                Adicionar
              </Button>
            </Stack>
          </Box>
          <Box bgColor="gray.1" w={['100%']} borderRadius="8" p="10" mt="6">
            <Heading fontSize="22">Editais do Aluno(a)</Heading>
            <Divider mb="6" mt="2" />
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
                  <Table style={{ borderCollapse: 'separate' }} size="sm">
                    <Thead>
                      <Tr>
                        <Th>Edital</Th>

                        {isWideVersion && <Th>Modalidade </Th>}
                        <Th>Ano</Th>
                        <Th width="3"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {edicts.map(edicts => {
                        return (
                          <Tr
                            key={edicts?.id}
                            bgColor="gray.1"
                            borderColor="pink.200"
                          >
                            <Td>
                              <Text fontWeight="bold">{edicts?.edital}</Text>
                            </Td>

                            {isWideVersion && <Td>{edicts?.modality}</Td>}
                            <Td>
                              <Text>{edicts?.year}</Text>
                            </Td>
                            {isWideVersion ? (
                              <Td px={['1', '2']}>
                                <Flex
                                  flexDirection="row"
                                  justifyContent="flex-end"
                                >
                                  <IconButton
                                    cursor="pointer"
                                    aria-label="Ver Histórico"
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="red"
                                    mr="1"
                                    //onClick={() => makeAsWithdrawn(donate._id)}
                                    borderRadius="6"
                                    icon={
                                      <Icon
                                        as={RiDeleteBin6Line}
                                        fontSize="16"
                                      />
                                    }
                                  />
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
                                      <Icon
                                        as={RiDeleteBin6Line}
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
                <Text> Não Alunos Cadastrados</Text>
              )}
            </Box>
          </Box>
        </Box>
      </Stack>
    </Layout>
  )
}
