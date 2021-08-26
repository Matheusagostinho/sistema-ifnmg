import Link from 'next/link'

import styles from './modalLogin.module.scss'
import { Button } from '../components/Form/Button'
import { Input } from './Form/Input'
import { FiLogIn } from 'react-icons/fi'
import { BsArrowRightShort } from 'react-icons/bs'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  useToast
} from '@chakra-ui/react'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from 'hooks/useAuth'
import { getSession, signIn, SignInResponse } from 'next-auth/client'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('O E-mail é um campo obrigatório')
    .email('E-mail Inválido'),
  password: yup.string().required('A senha é um campo obrigatório')
})

export function ModalLogin({ isOpen, onClose }) {
  const { signInWithGoogle, user, fetchDonor } = useAuth()
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors } = formState
  const toast = useToast()
  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    event.preventDefault()
    const status: SignInResponse = await signIn(
      'donor',

      {
        redirect: false,
        email: values.email,
        password: values.password
      }
    )

    if (status.error) {
      toast({
        title: `${status.error}`,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      })
      return
    }

    const session = await getSession()
    const email = session?.user.email
    if (session) {
      toast({
        title: `Login com Sucesso`,
        status: 'success',
        isClosable: true,
        position: 'top-right'
      })
      fetchDonor(email)
      onClose()
    }
  }

  const handleSignInGoogle = async () => {
    await signInWithGoogle()
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <div className={styles.container}>
            <div className={styles.content}>
              <button
                className={styles.createRoom}
                onClick={handleSignInGoogle}
              >
                <img src="/images/google-icon.svg" alt="AjudaAi" />
                Conectar-se com o Google
              </button>
              <div className={styles.separator}> ou entre com seu e-mail</div>
              <form onSubmit={handleSubmit(handleSignIn)}>
                <Input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  error={errors.email}
                  {...register('email')}
                  mb="2"
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Senha"
                  error={errors.password}
                  {...register('password')}
                />
                <Button
                  type="submit"
                  leftIcon={<Icon as={FiLogIn} />}
                  isLoading={formState.isSubmitting}
                  w="100%"
                  mt="2"
                >
                  Entrar
                </Button>
              </form>
              <Link href="/signup">
                <a>
                  <span> Não tenho cadastro </span>
                  <BsArrowRightShort />
                </a>
              </Link>
            </div>
          </div>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
