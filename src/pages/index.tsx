import { Button } from '../components/Form/Button'
import { FiLogIn } from 'react-icons/fi'
import { GrFormView, GrFormViewHide } from 'react-icons/gr'
import styles from '../styles/home.module.scss'
import Head from 'next/head'

import {
  Icon,
  IconButton,
  InputRightElement,
  SlideFade,
  useToast
} from '@chakra-ui/react'
import router from 'next/router'
import { Input } from '../components/Form/Input'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputRef } from 'components/Form/InputRef'
import { useState } from 'react'
type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object({
  email: yup
    .string()
    .required('O E-mail é um campo obrigatório')
    .email('E-mail Inválido'),
  password: yup.string().required('A senha é um campo obrigatório')
})

export default function Home() {
  const [show, setShow] = useState(false)
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const toast = useToast()
  const { errors } = formState
  console.log(errors)
  const handlePasswordClick = () => setShow(!show)
  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    event.preventDefault()
    await new Promise(resolve => setTimeout(resolve, 2000))

    const email = values.email
    const password = values.password
    console.log(email)

    if (email) {
      toast({
        title: `Login com Sucesso`,
        status: 'success',
        isClosable: true,
        position: 'top-right'
      })

      router.push('/students')
    }
  }
  return (
    <>
      <Head>
        <title>Gestor-IFNMG</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div id={styles.pageAuth}>
        <main>
          <SlideFade in={true} offsetY="-20px" className={styles.mainContent}>
            <img src="/images/logo.png" alt="AjudaAi" />
            <form onSubmit={handleSubmit(handleSignIn)}>
              <h1>Faça seu login</h1>
              <InputRef
                type="text"
                placeholder="E-mail"
                mb="2"
                error={errors.email}
                {...register('email')}
              />
              <InputRef
                type={show ? 'text' : 'password'}
                placeholder="Senha"
                mb="2"
                error={errors.password}
                {...register('password', {
                  onChange: e => console.log(e.value)
                })}
              >
                <InputRightElement width="2.5rem">
                  <IconButton
                    variant="link"
                    color="purple.500"
                    aria-label="View Password"
                    icon={
                      show ? (
                        <GrFormView size="30" />
                      ) : (
                        <GrFormViewHide size="30" />
                      )
                    }
                    onClick={handlePasswordClick}
                  />
                </InputRightElement>
              </InputRef>

              <Button
                type="submit"
                leftIcon={<Icon as={FiLogIn} />}
                isLoading={formState.isSubmitting}
              >
                Login
              </Button>
            </form>
          </SlideFade>
        </main>
        <aside>
          <SlideFade in={true} offsetY="20px">
            <img
              src="images/illustration.png"
              alt="Ilustração simbolizando professores se conectando entre si"
            />

            <p>
              Sistema para acompanhamento de discentes beneficiários de auxilio
              estudantil
            </p>
          </SlideFade>
        </aside>
      </div>
    </>
  )
}
