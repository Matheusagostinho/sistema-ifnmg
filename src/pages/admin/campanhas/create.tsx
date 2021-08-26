import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'

import { Header } from '../../../components/HeaderAdmin'
import { Sidebar } from '../../../components/Sidebar'
import { Input } from '../../../components/Form/Input'

import { api } from '../../../services/api'
import { queryClient } from '../../../services/queryClient'
import { LayoutOutAdmin } from 'components/LayoutAdmin'

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const res = await api.post('users', {
        user: {
          ...user,
          created_at: new Date()
        }
      })

      return res.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      }
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async values => {
    await createUser.mutateAsync(values)

    router.push('/users')
  }

  return (
    <LayoutOutAdmin>
      <Heading size="lg" fontWeight="normal">
        Criar usuário
      </Heading>

      <Divider my="6" borderColor="gray.700" />

      <VStack spacing={['6', '8']}>
        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            name="name"
            label="Nome completo"
            type="text"
            error={errors.name}
            {...register('name')}
            isBgWhite
          />
          <Input
            name="email"
            label="E-mail"
            type="email"
            error={errors.email}
            {...register('email')}
            isBgWhite
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            name="password"
            label="Senha"
            type="password"
            error={errors.password}
            {...register('password')}
            isBgWhite
          />
          <Input
            name="password_confirmation"
            label="Confirmação da senha"
            type="password"
            error={errors.password_confirmation}
            {...register('password_confirmation')}
            isBgWhite
          />
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Link href="/admin/doadores" passHref>
            <Button as="a" colorScheme="blackAlpha">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" colorScheme="red" isLoading={isSubmitting}>
            Salvar
          </Button>
        </HStack>
      </Flex>
    </LayoutOutAdmin>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}
