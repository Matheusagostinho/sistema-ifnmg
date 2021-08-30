import Head from 'next/head'
import {
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  LinkOverlay,
  SlideFade,
  Text,
  VStack
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { RiArrowLeftLine } from 'react-icons/ri'
import { BiLinkExternal } from 'react-icons/bi'

export default function Sobre() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Ajuda ai - Sobre</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <SlideFade in={true} offsetY="20px">
        <IconButton
          aria-label="Voltar"
          icon={<Icon as={RiArrowLeftLine} fontSize="30" />}
          variant="unstyled"
          size="md"
          position="fixed"
          top={['20px', '20px', '30px']}
          left={['10px', '10px', '50px']}
          color="gray.100"
          onClick={() => router.back()}
        />
        <Box
          bg="red.500"
          color="gray.100"
          h="100%"
          minH="100vh"
          display="flex"
          justifyContent="center"
          p="8"
        >
          <Box>
            <VStack spacing="2" maxWidth="800px" pl={['12', '12', '12', 0]}>
              <Image
                src="images/distance.svg"
                alt="Ilustração simbolizando perguntas e respostas"
                w="200px"
              />
              <Text>
                Praticamente em todas as áreas fomos forçados a nos adequar a
                realidade da pandemia. Com isso os trabalhos sociais prestados
                por associações, ongs, ou grupo de voluntários também foram
                afetados
              </Text>
              <Text>
                Um exemplo foi uma campanha social denominada “Campanha de
                Fraternidade Auta de Souza” ou mais conhecida “Campanha do
                Quilo”, onde sua finalidade é sair de porta em porta pedindo
                donativos assim, fazendo montagens de cestas básicas para doar
                para a população mais necessitada do município. Com a pandemia
                esse trabalho teve uma paralização.
              </Text>
              <Text>
                Hoje em dia mais de 19 milhões de brasileiros estão em situação
                de vulnerabilidade, e nosso objetivo é ajudar a diminuir esses
                números e aumentar a divulgação dos trabalhos voluntários
                voltados para a pratica da caridade.
              </Text>
              <Image
                src="images/logoGray.png"
                alt="Ilustração simbolizando perguntas e respostas"
                w="200px"
              />
              <Text>
                O AjudaAi é um projeto que consiste interligar doadores a
                associações, aonde um doador procura possíveis associações em
                sua cidade delimitada para realizar um agendamento de retirada
                de um donativo, feito o agendamento, a associação selecionada
                irá receber os dados do agendamento e encaminhando um
                trabalhador voluntario da mesma para a retirada do donativo na
                data e horário delimitado pelo doador no ato do agendamento.
              </Text>
            </VStack>
            <Box my="6rem" display="flex" alignItems="center" flexDir="column">
              <Heading size="lg" textAlign="center">
                Sua solidariedade faz toda diferença. Doe e Ajude!
              </Heading>
              <Button
                colorScheme="green"
                size="md"
                minW="320px"
                mt="2"
                onClick={() => router.back()}
              >
                Doe Agora!
              </Button>
            </Box>
            <Box my="6rem" display="flex" alignItems="center" flexDir="column">
              <Text size="lg" textAlign="center">
                Sou uma Associação e quero me cadastrar?
              </Text>
              <Button
                colorScheme="gray"
                color="gray.800"
                size="md"
                minW="320px"
                mt="2"
                onClick={() => router.push('/admin')}
              >
                Cadastre sua Instituição
              </Button>
            </Box>
            <Box>
              <Text size="sm">
                Esse projeto foi desenvolvido pelos alunos do 6º período de
                Sistema de Informação do IFNMG- Campus Pirapora.
              </Text>
              <Box display=" flex">
                <Text>Link do Projeto: </Text>
                <Link
                  href="https://github.com/Matheusagostinho/projetoajudaai"
                  isExternal
                  ml="3px"
                >
                  GitHub <Icon as={BiLinkExternal} mx="2px" />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </SlideFade>
    </>
  )
}
