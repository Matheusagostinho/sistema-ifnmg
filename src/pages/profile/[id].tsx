import {
  SlideFade,
  VStack,
  Grid,
  Box,
  GridItem,
  Button as ButtonChakra,
  Image,
  LinkOverlay,
  useBreakpointValue,
  Text,
  Link,
  useDisclosure,
  Textarea,
  Icon,
  useToast
} from '@chakra-ui/react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { GetServerSideProps } from 'next'
import { Header } from '../../components/Header'
import { Button } from '../../components/Form/Button'
import styles from '../../styles/profile.module.scss'
import { useEffect, useState } from 'react'
import { Input } from '../../components/Form/Input'
import { api } from 'services/api'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { parseCookies } from 'nookies'
import { useAuth } from 'hooks/useAuth'
import { ModalLogin } from 'components/ModalLogin'
import { database } from '../../services/firebase'
import { FiClock } from 'react-icons/fi'
import { BiCalendarAlt } from 'react-icons/bi'

type Association = {
  id: string
  name: string
  description: string
  urlImage: string
  phone: string
  since: string
  about: string
  address: string
  id_city: string
  people_assisted: string
  facebook: string
  instagram: string
}
type DataProps = {
  association: Association
  city: {
    id: string
    name: string
  }
}

type DonorFormData = {
  name: string
  phone: string
  email: string
  street: string
  district: string
  number: string
  city: string
  uf: string
  date: string
  hour: string
  donate: string
}

const DonorFormSchema = yup.object().shape({
  name: yup.string().required('O nome é um campo obrigatório'),
  phone: yup.string().required('O telefone é um campo obrigatório'),
  street: yup.string().required('A Rua é um campo obrigatório'),
  district: yup.string().required('O bairro é um campo obrigatório'),
  number: yup.string().required('O numero é um campo obrigatório'),
  city: yup.string().required('A cidade é um campo obrigatório'),
  uf: yup.string().required('O estado é um campo obrigatório'),
  date: yup.string().required('A data é um campo obrigatório'),
  hour: yup.string().required('O horário é um campo obrigatório'),
  donate: yup.string().required('O que irá é um campo obrigatório')
})

export default function ProfileAssociation({ association, city }: DataProps) {
  const [formDonate, setFormDonate] = useState(false)
  const { user, setUser, signInWithGoogle } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  const { register, handleSubmit, formState, reset, watch } = useForm({
    resolver: yupResolver(DonorFormSchema)
  })
  const { errors } = formState
  const watchAllFields = watch()
  const toast = useToast()

  const day = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit'
  })
  const month = new Date().toLocaleDateString('pt-BR', {
    month: '2-digit'
  })
  const year = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric'
  })
  const nowDate = [year, month, day].join('-')
  let nowHour = new Date().toLocaleDateString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
  nowHour = nowHour.slice(11, 16)

  useEffect(() => {
    reset({
      name: user?.name,
      phone: user?.phone,
      street: user?.address.street,
      district: user?.address.district,
      number: user?.address.number,
      city: user?.address.number || city.name,
      uf: user?.address.number || 'MG',
      date: nowDate,
      hour: nowHour
    })
  }, [user])

  const handleDonorAppointment: SubmitHandler<DonorFormData> = async (
    values,
    event
  ) => {
    event.preventDefault()
    const dateformated = new Date(values.date)
    const data = {
      ...user,
      id: user._id,
      name: values.name,
      phone: values.phone,
      email: user.email,
      street: values.street,
      district: values.district,
      number: values.number,
      city: values.city,
      uf: values.uf,
      date: dateformated,
      hour: values.hour,
      donate: values.donate,
      id_association: association.id
    }

    try {
      const res = await api.post('/donates/create', data)

      if (res.status === 201) {
        toast({
          title: `Agendamento feito com sucesso`,
          status: 'success',
          isClosable: true,
          position: 'top-right'
        })
        setFormDonate(false)
        setUser(res.data.user)

        await database
          .ref(`associations/${association.id}/donates`)
          .push({ isNewDonateId: res.data.donate.insertedId })
      }
    } catch (err) {
      if (err.response?.status === 409) {
        toast({
          title: `Erro no agendamento`,
          status: 'warning',
          isClosable: true,
          position: 'top-right'
        })

        toast({
          title: `Erro no agendamento`,
          status: 'error',
          isClosable: true,
          position: 'top-right'
        })
        return
      }
    }
  }

  return (
    <>
      <Header>
        <Box
          display="flex"
          flexDir="column"
          alignContent="center"
          justifyContent="center"
          textAlign="center"
        >
          {isWideVersion && (
            <Box w="100%">
              <Text display="flex">
                <Text mr="1" fontWeight="bold">
                  {association?.name}
                </Text>
                auxiliam mais de
                <Text color="red.500" fontWeight="bold" mx="1">
                  {association?.people_assisted} famílias
                </Text>
                em sua cidade!
              </Text>
            </Box>
          )}
        </Box>
      </Header>
      <div className={styles.container}>
        <main>
          <div className={styles.aside}>
            <Image
              src={association?.urlImage}
              alt={association?.name}
              borderRadius="full"
              h="160px"
              w="160px"
            />
            <h2> {association?.name}</h2>
            <span>Desde {association?.since}</span>
            <h3>Telefone:</h3>
            <p>{association?.phone}</p>
            <h3>Endereço:</h3>
            <Text as="p" display="block">
              {association?.address}
            </Text>
          </div>
          <div className={styles.content}>
            <SlideFade
              in={formDonate === false ? true : false}
              offsetY="20px"
              unmountOnExit
            >
              <h2>Sobre:</h2>
              <div>
                <p>{association?.about}</p>
              </div>
              <h2>Projetos sociais:</h2>
              {/* <h2>Campanhas:</h2> */}
              {(association?.facebook || association?.instagram) && (
                <>
                  <h2>Conheça mais sobre nós:</h2>
                  <Box mt="4">
                    {association?.facebook && (
                      <ButtonChakra
                        leftIcon={<FaFacebook />}
                        colorScheme="facebook"
                      >
                        <LinkOverlay href={association?.facebook} isExternal>
                          Facebook
                        </LinkOverlay>
                      </ButtonChakra>
                    )}
                    {association?.instagram && (
                      <ButtonChakra
                        leftIcon={<FaInstagram />}
                        colorScheme="pink"
                        ml="2"
                      >
                        <LinkOverlay href={association?.instagram} isExternal>
                          Instagram
                        </LinkOverlay>
                      </ButtonChakra>
                    )}
                  </Box>
                </>
              )}
            </SlideFade>
            <SlideFade in={formDonate} offsetY="200px" unmountOnExit>
              {user ? (
                <Box
                  as="form"
                  overflow="visible"
                  className={styles.formDonor}
                  onSubmit={handleSubmit(handleDonorAppointment)}
                  display="flex"
                  w="100%"
                  flex="1"
                  flexDirection={['column', 'column', 'column']}
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    w="100%"
                    flex="1"
                    flexDirection={['column', 'column', 'column', 'row']}
                    alignItems={['center', 'center', 'center', 'flex-start']}
                  >
                    <VStack
                      spacing="4"
                      maxWidth="400px"
                      mr={['0', '0', '0', '6']}
                    >
                      <h3>Dados de Retirada</h3>
                      <Input
                        error={errors.name}
                        {...register('name')}
                        placeholder="Seu Nome"
                        defaultValue={user.name}
                      />
                      <Input
                        placeholder="Telefone"
                        error={errors.phone}
                        {...register('phone')}
                        mask="(99) 9 9999-9999"
                        defaultValue={user.phone}
                        value={watchAllFields.phone}
                      />
                      <Input
                        placeholder="Rua"
                        error={errors.street}
                        {...register('street')}
                        defaultValue={user.address?.street}
                      />

                      <Box display="flex">
                        <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                          <GridItem colSpan={4} h="10">
                            <Input
                              type="text"
                              placeholder="Bairro"
                              error={errors.district}
                              {...register('district')}
                              defaultValue={user.address?.district}
                            />
                          </GridItem>
                          <GridItem colSpan={2} h="10">
                            <Input
                              type="number"
                              placeholder="Número"
                              error={errors.number}
                              {...register('number')}
                              defaultValue={user.address?.number}
                            />
                          </GridItem>
                        </Grid>
                      </Box>
                      <Box display="flex">
                        <Grid templateColumns="repeat(8, 1fr)" gap={2} mt="2">
                          <GridItem colSpan={6} h="10">
                            <Input
                              type="text"
                              placeholder="Cidade"
                              error={errors.city}
                              {...register('city')}
                              defaultValue={user.address?.city || city?.name}
                            />
                          </GridItem>
                          <GridItem colSpan={2} h="10">
                            <Input
                              type="text"
                              placeholder="UF"
                              error={errors.uf}
                              {...register('uf')}
                              defaultValue={user.address?.uf || 'MG'}
                            />
                          </GridItem>
                        </Grid>
                      </Box>
                    </VStack>

                    <VStack
                      spacing={['2', '4']}
                      maxWidth="400px"
                      mt={['2', '0']}
                      w="100%"
                      minHeight="330px"
                    >
                      <h3>Data de Retirada</h3>
                      <Box display="flex" w="100%">
                        <Grid templateColumns="repeat(4, 1fr)" gap={2} w="100%">
                          <GridItem colSpan={2} h="10" position="relative">
                            <Input
                              w="100%"
                              type="date"
                              placeholder="dd/mm/aaaa"
                              defaultValue={nowDate}
                              error={errors.date}
                              {...register('date')}
                            />
                            {!isWideVersion && (
                              <Icon
                                fontSize="20px"
                                as={BiCalendarAlt}
                                position="absolute"
                                top="12px"
                                right="14px"
                              />
                            )}
                          </GridItem>
                          <GridItem colSpan={2} h="10" position="relative">
                            <Input
                              w="100%"
                              type="time"
                              name="hour"
                              placeholder="--:--"
                              defaultValue={nowHour}
                              {...register('hour')}
                              error={errors.hour}
                            />
                            {!isWideVersion && (
                              <Icon
                                fontSize="20px"
                                as={FiClock}
                                position="absolute"
                                top="12px"
                                right="14px"
                              />
                            )}
                          </GridItem>
                        </Grid>
                      </Box>

                      <h3>O que irá doar?</h3>
                      <Textarea
                        h="100px"
                        placeholder="Alimentos, roupas, brinquedos, etc..."
                        focusBorderColor="red.500"
                        bgColor={true ? 'gray.50' : 'gray.1'}
                        borderColor={true ? 'gray.100' : ''}
                        borderWidth={true ? '1px' : '0px'}
                        variant="filled"
                        _hover={{
                          bgColor: 'gray.50'
                        }}
                        _focus={{
                          bgColor: 'gray.1',
                          borderColor: 'red.500',
                          borderWidth: '1px'
                        }}
                        size="md"
                        resize="vertical"
                        error={errors.donate}
                        {...register('donate')}
                      />
                    </VStack>
                  </Box>
                  <Button
                    type="submit"
                    isLoading={formState.isSubmitting}
                    w="100%"
                    maxWidth="400px"
                    mt="6"
                  >
                    Finalizar Doação :D
                  </Button>
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  minWidth={['350px', '350px', '426px', '826px']}
                  h="100%"
                  flex="1"
                  mt={['1rem', '1rem', '8rem']}
                >
                  <Text
                    fontSize="1.2rem"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="gray.500"
                  >
                    Para continuar,
                    <Link color="red.500" ml="1" onClick={signInWithGoogle}>
                      faça Login.
                    </Link>
                  </Text>
                  {/* <ModalLogin isOpen={isOpen} onClose={onClose} /> */}
                </Box>
              )}
            </SlideFade>
          </div>
        </main>
        <footer>
          {formDonate ? (
            <>
              <Link
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => setFormDonate(false)}
                fontSize="1.2rem"
                pl={[0, 0, '10rem', '7rem']}
                fontWeight="bold"
              >
                <Icon as={BsArrowLeftShort} fontSize="1.4rem" color="red.500" />
                <Text color="gray.500">Cancelar</Text>
              </Link>
            </>
          ) : (
            <Button
              type="button"
              onClick={() => setFormDonate(true)}
              w="400px"
              ml={[0, 0, '10rem', '7rem']}
            >
              Doe sem sair de casa :{')'}
            </Button>
          )}
        </footer>
      </div>
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await api.get('/associations/pirapora-mg', {
//     params: {
//       __limit: 6
//     }
//   })

//   const paths = data.map(association => ({
//     params: {
//       id: association._id
//     }
//   }))

//   return {
//     paths,
//     fallback: 'blocking'
//   }
// }

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.params
  const cookies = parseCookies(ctx)
  const { data } = await api.get(`/profile/${id}`, {})
  const name = cookies['ajudaai.cityName']
  const cityId = cookies['ajudaai.cityId']
  const city = {
    id: cityId,
    name: name.replace('-MG', '')
  }

  let join = [data.address.street, data.address.number]
  let street = join.join(', nº ')
  join = [street, data.address.district]
  street = join.join(', ')
  join = [street, name]
  const address = join.join(' - ')

  const association = {
    id: data._id,
    name: data.name,
    description: data.description,
    urlImage: data.url_image,
    phone: data.phone,
    since: data.since,
    about: data.about,
    address: address,
    id_city: data.id_city,
    people_assisted: data.people_assisted,

    facebook: data.facebook,
    instagram: data.instagram
  }

  return {
    props: {
      association,
      city
    }
    // revalidate: 60 * 30 // 30 minutes
  }
}
