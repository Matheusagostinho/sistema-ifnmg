import Link from 'next/link'
import { Button } from '../../components/Form/Button'
import { FiLogIn } from 'react-icons/fi'
import styles from '../../styles/admin.module.scss'
import Head from 'next/head'
import { Input } from '../../components/Form/Input'
import { BsArrowLeftShort } from 'react-icons/bs'
import removeAccents from 'remove-accents'
import slugify from 'react-slugify'

import {
  Box,
  Grid,
  GridItem,
  Icon,
  SlideFade,
  useToast,
  VStack
} from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import router, { useRouter } from 'next/router'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { api } from 'services/api'

type SignInFormData = {
  email: string
  nameAssociation: string
  nameDir: string
  phoneNumber: string
  street: string
  district: string
  number: string
  city: string
  uf: string
  password: string
  passwordConfirmation: string
}
type City = {
  _id: string
  name: string
  slug: string
}
const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('O E-mail é um campo obrigatório')
    .email('E-mail Inválido'),
  nameAssociation: yup.string().required('O nome da Associação é obrigatório'),
  nameDir: yup.string().required('O nome do dirigente é obrigatório'),
  phoneNumber: yup
    .string()
    .required('O telefone é um campo obrigatório')
    .min(11, 'Numero Incompleto'),
  street: yup.string().required('A rua é um campo obrigatório'),
  district: yup.string().required('O Bairro é um campo obrigatório'),
  number: yup.string().required('O número é um campo obrigatório'),
  city: yup.string().required('A cidade é um campo obrigatório'),
  uf: yup
    .string()
    .required('O estado é um campo obrigatório')
    .max(2, 'Somente Sigla'),
  password: yup
    .string()
    .required('A senha é um campo obrigatório')
    .min(6, 'No mínimo 6 caracteres'),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function Register() {
  const [cities, setCities] = useState<City[]>([] as City[])
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    setValue,
    watch,
    reset
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  useEffect(() => {
    async function loadCities() {
      const { data } = await api.get('/cities')
      setCities(data)
      clearErrors()
    }
    loadCities()
  }, [])

  const watchAllFields = watch()
  const { errors } = formState
  const toast = useToast()
  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    event.preventDefault()

    if (values.passwordConfirmation !== values.password) {
      toast({
        title: `Senhas estão diferentes`,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      })
      return
    }

    const { _id } = cities.find(city => city.name === values.city) || {
      _id: ''
    }
    if (_id === '') {
      toast({
        title: `Cidade nao existe`,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      })
      return
    }

    const data = {
      name: values.nameAssociation,
      email: values.email.toLowerCase(),
      director: values.nameDir,
      slug: slugify(values.nameAssociation),
      phone: values.phoneNumber.replace(/[^0-9]+/g, ''),
      address: {
        street: values.street,
        number: values.number,
        district: values.district
      },
      id_city: _id,
      password: values.password
    }
    const res = await api.post('/associations/create', data)

    if (res.status === 204) {
      toast({
        title: `E-mail ja cadastrado`,
        status: 'warning',
        isClosable: true,
        position: 'top-right'
      })
      return
    }

    if (res.status === 201) {
      toast({
        title: `Cadastro feito com sucesso`,
        status: 'success',
        isClosable: true,
        position: 'top-right'
      })
      router.push('/admin')
    }

    return
  }

  function onChangeSetCity(name: String) {
    setValue('city', name)
    setValue('uf', 'MG')
  }
  return (
    <>
      <Head>
        <title>Portal Associação- Ajuda ai</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div id={styles.register}>
        <main>
          <SlideFade in={true} offsetY="-20px" className={styles.mainContent}>
            <img src="/images/logo.png" alt="AjudaAi" />
            <div>
              <h1>Cadastro</h1>
              <p>
                Faça seu cadastro, entre na plataforma e ajude pessoas a
                encontrarem uma forma de ajudar o proximo por meio de sua
                associação.
              </p>
            </div>

            <Link href="/admin">
              <a>
                <BsArrowLeftShort />
                <span> Voltar para login </span>
              </a>
            </Link>
          </SlideFade>

          <SlideFade in={true} offsetY="20px" className={styles.form}>
            <VStack as="form" onSubmit={handleSubmit(handleSignIn)} spacing="2">
              <Input
                type="text"
                placeholder="Nome da Associação"
                error={errors.nameAssociation}
                {...register('nameAssociation')}
              />
              <Input
                type="text"
                placeholder="Nome do Completo do Dirigente"
                error={errors.nameDir}
                {...register('nameDir')}
              />
              <Input
                type="email"
                placeholder="E-mail"
                error={errors.email}
                {...register('email')}
              />
              <Input
                mask="(99) 9 9999-9999"
                type="text"
                placeholder="WhatsApp"
                error={errors.phoneNumber}
                {...register('phoneNumber')}
              />
              <Input
                type="text"
                placeholder="Rua"
                error={errors.street}
                {...register('street')}
              />
              <Box display="flex">
                <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                  <GridItem colSpan={4} h="10">
                    <Input
                      type="text"
                      placeholder="Bairro"
                      error={errors.district}
                      {...register('district')}
                    />
                  </GridItem>
                  <GridItem colSpan={2} h="10">
                    <Input
                      type="number"
                      placeholder="Número"
                      error={errors.number}
                      {...register('number')}
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
                      value={watchAllFields.city}
                    />
                    <div className={styles.suggestions}>
                      {cities
                        .filter(name => {
                          if (watchAllFields.city === '') {
                            return false
                          } else if (
                            removeAccents(name.name).toLowerCase() ===
                            removeAccents(
                              String(watchAllFields.city).toLowerCase()
                            )
                          )
                            return false
                          else if (
                            removeAccents(name.name)
                              .toLowerCase()
                              .includes(
                                removeAccents(
                                  String(watchAllFields.city).toLowerCase()
                                )
                              )
                          ) {
                            return name
                          }
                        })
                        .map(filteredName => (
                          <div>
                            <button
                              type="button"
                              onClick={() => onChangeSetCity(filteredName.name)}
                            >
                              {filteredName.name}
                            </button>
                          </div>
                        ))}
                    </div>
                  </GridItem>
                  <GridItem colSpan={2} h="10">
                    <Input
                      type="text"
                      placeholder="UF"
                      error={errors.uf}
                      {...register('uf')}
                      value={watchAllFields.uf}
                    />
                  </GridItem>
                </Grid>
              </Box>
              <Box display="flex">
                <Grid templateColumns="repeat(6, 1fr)" gap={2} my="2">
                  <GridItem colSpan={3} h="10">
                    <Input
                      type="password"
                      placeholder="Senha"
                      error={errors.password}
                      {...register('password')}
                    />
                  </GridItem>
                  <GridItem colSpan={3} h="10">
                    <Input
                      type="password"
                      placeholder="Repita a senha"
                      error={errors.passwordConfirmation}
                      {...register('passwordConfirmation')}
                    />
                  </GridItem>
                </Grid>
              </Box>

              <Button
                type="submit"
                leftIcon={<Icon as={FiLogIn} />}
                isLoading={formState.isSubmitting}
                w="100%"
              >
                Cadastrar
              </Button>
            </VStack>
            <Link href="/admin">
              <a>
                <BsArrowLeftShort />
                <span> Voltar para login </span>
              </a>
            </Link>
          </SlideFade>
        </main>
      </div>
    </>
  )
}
