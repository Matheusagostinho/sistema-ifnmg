import Link from 'next/link'
import { Button } from '../components/Form/Button'
import { FiLogIn } from 'react-icons/fi'
import styles from '../styles/home.module.scss'
import Head from 'next/head'
import { Input } from '../components/Form/Input'
import { BsArrowLeftShort } from 'react-icons/bs'
import { Icon, LinkBox, SlideFade, Stack } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import router, { Router, useRouter } from 'next/router'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

type SignInFormData = {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}

const signInFormSchema = yup.object().shape({
  name: yup.string().required('O nome é um campo obrigatório'),
  email: yup
    .string()
    .required('O E-mail é um campo obrigatório')
    .email('E-mail Inválido'),
  password: yup.string().required('A senha é um campo obrigatório'),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors } = formState
  const handleFormLogIn: SubmitHandler<SignInFormData> = async (
    values,
    event
  ) => {
    event.preventDefault()

    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log(values)
  }
  return (
    <>
      <Head>
        <title>Ajuda ai</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div id={styles.pageAuth}>
        <main>
          <SlideFade in={true} offsetY="-20px" className={styles.mainContent}>
            <img src="/images/logo.png" alt="AjudaAi" />

            <div className={styles.titleSmartphone}>
              <strong>
                Falta pouco para você alegrar o dia de alguém :{')'}
              </strong>
              <p>
                O AjudaAi é uma plataforma para conectar quem precisa de ajuda
                com quem queira ajudar!
              </p>
            </div>
            <h1>Preencha com seus dados:</h1>
            <Stack
              as="form"
              spacing="2"
              onSubmit={handleSubmit(handleFormLogIn)}
            >
              <Input
                type="text"
                placeholder="Seu nome"
                error={errors.name}
                {...register('name')}
              />
              <Input
                type="email"
                placeholder="E-mail"
                error={errors.email}
                {...register('email')}
              />
              <Input
                type="password"
                placeholder="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                type="password"
                placeholder="Repita sua Senha"
                error={errors.passwordConfirmation}
                {...register('passwordConfirmation')}
              />
              <Button
                type="submit"
                leftIcon={<Icon as={FiLogIn} />}
                isLoading={formState.isSubmitting}
                w="100%"
              >
                Cadastrar
              </Button>
            </Stack>
            <LinkBox onClick={() => router.back()} cursor="pointer">
              <a>
                <BsArrowLeftShort />
                <span> Voltar para login </span>
              </a>
            </LinkBox>
          </SlideFade>
        </main>
        <aside>
          <SlideFade in={true} offsetY="20px">
            <img
              src="images/illustration.png"
              alt="Ilustração simbolizando perguntas e respostas"
            />
            <strong>
              Falta pouco para você alegrar o dia de alguém :{')'}
            </strong>
            <p>
              O AjudaAi é uma plataforma para conectar quem precisa de ajuda com
              quem queira ajudar!
            </p>
          </SlideFade>
        </aside>
      </div>
    </>
  )
}
