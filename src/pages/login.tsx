import Link from 'next/link'
import { Button } from '../components/Form/Button'
import { FiLogIn } from 'react-icons/fi'
import styles from '../styles/home.module.scss'
import Head from 'next/head'
import { Input } from 'components/Input'
import { BsArrowLeftShort } from 'react-icons/bs'
import { SlideFade } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  function handleFormLogin(event: FormEvent) {
    event.preventDefault()
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
            <form onSubmit={handleFormLogin}>
              <Input
                type="text"
                placeholder="Seu nome"
                // onChange={}
                // value={}
              />
              <Input
                type="email"
                placeholder="E-mail"
                // onChange={}
                // value={}
              />
              <Input
                type="password"
                placeholder="Senha"
                // onChange={}
                // value={}
              />
              <Input
                type="password"
                placeholder="Repita sua Senha"
                // onChange={}
                // value={}
              />
              <Button type="submit">
                <FiLogIn />
                Cadastrar
              </Button>
            </form>
            <Link href="/">
              <a>
                <BsArrowLeftShort />
                <span> Voltar para login </span>
              </a>
            </Link>
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
