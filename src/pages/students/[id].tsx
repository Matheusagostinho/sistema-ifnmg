import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Stack,
  Text,
  useBreakpointValue
} from '@chakra-ui/react'
import { Button } from 'components/Form/Button'

import { Layout } from 'components/Layout'

import { Comments } from 'components/Comments'

interface EdictsProps {
  id: string
  edital: string
  modality: string
  year: string
}

export default function NewStudent() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Layout>
      <Stack
        spacing={10}
        display="flex"
        justifyContent="start"
        alignItems="top"
        mt="-14"
        zIndex="base"
        direction={['column']}
        w="80%"
      >
        <Box bgColor="gray.1" w={['100%']} borderRadius="8" px="10" pt="10">
          <Grid
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(7, 1fr)"
            gap={1}
          >
            <GridItem
              rowSpan={1}
              colSpan={4}
              display="flex"
              alignItems="center"
            >
              <Avatar mr="2" w="64px" h="64px" />
              <Box>
                <Text fontWeight="bold" fontSize="xl">
                  Matheus Agostinho
                </Text>
                <Text mt="-1">Matrícula: 2145448</Text>
              </Box>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={3}
              alignItems="center"
              display="flex"
            >
              <Box>
                <Text color="gray.400" mb="-1" fontSize="small">
                  Telefone de Contato:
                </Text>
                <Text fontWeight="bold" fontSize="xl">
                  (38) 99892-0277
                </Text>
              </Box>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={4}
              alignItems="center"
              display="flex"
            >
              <Box>
                <Text mb="-1" fontSize="small" fontWeight="bold">
                  Curso:
                </Text>
                <Text color="gray.500">Sistemas de Informação</Text>
              </Box>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={3}
              alignItems="center"
              display="flex"
            >
              <Box>
                <Text mb="-1" fontSize="small" fontWeight="bold">
                  Edital:
                </Text>
                <Text color="gray.500">
                  Auxílio Emergencial COVID-19 - Ano 2021 - 2º semestre
                </Text>
              </Box>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={4}
              alignItems="center"
              display="flex"
            >
              <Box>
                <Text mb="-1" fontSize="small" fontWeight="bold">
                  Ano Módulo ou Período:
                </Text>
                <Text color="gray.500">8º Período</Text>
              </Box>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={3}
              alignItems="center"
              display="flex"
            >
              <Box>
                <Text mb="-1" fontSize="small" fontWeight="bold">
                  Modalidade do Auxilio:
                </Text>
                <Text color="gray.500">Permancência II</Text>
              </Box>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={7}
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <Box textAlign="center">
                <Text mb="-1" fontSize="small" fontWeight="bold">
                  Endereço:
                </Text>
                <Text color="gray.500">
                  Rua Armando Braga, 1127, Santos Dumont, Pirapora/MG
                </Text>
              </Box>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={7}
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <Box textAlign="center">
                <Text mb="-1" fontSize="small" fontWeight="bold">
                  Observações:
                </Text>
                <Text color="gray.500">Está formando</Text>
              </Box>
            </GridItem>
          </Grid>
          <Box bg="gray.200" h="1px" w="111%" mx="-10" />
          <Box
            h="100px"
            display="flex"
            justifyContent="end"
            alignItems="center"
          >
            <Button
              as="a"
              size="lg"
              fontSize="md"
              bgColor="green.100"
              type="button"
              cursor="pointer"
              color="#FFF"
              _hover={{
                backgroundColor: 'var(--green-300)',
                color: '#FFF'
              }}
            >
              Editar Perfil / Vincular Edital
            </Button>
          </Box>
        </Box>
        <Box>
          <Box
            bgColor="gray.50"
            h="120px"
            borderTopRadius="8"
            borderBottom="1px"
            borderBottomColor="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="10"
          >
            <Text fontSize="large" fontWeight="bold" color="green.200">
              Histórico do Aluno(a):
            </Text>
            <Button
              as="a"
              size="lg"
              fontSize="md"
              colorScheme="purple"
              type="button"
              cursor="pointer"
              _hover={{
                color: '#FFF'
              }}
            >
              Nova Observação
            </Button>
          </Box>
          <Stack
            zIndex="base"
            spacing={6}
            divider={
              <div className="custom-timeline">
                <Box className="custom-timeline-line" />
                <Box className="custom-timeline-point" />
              </div>
            }
          >
            <Comments />
            <Comments />
            <Comments />
          </Stack>
          <Box className="timeline-end-line" />
          <Box className="timeline-end-point" />
        </Box>
      </Stack>
    </Layout>
  )
}
