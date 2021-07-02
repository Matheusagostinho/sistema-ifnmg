import Link from 'next/link'
import { Button } from '../../components/Button'
import { FiLogIn } from 'react-icons/fi'
import styles from '../../styles/admin.module.scss'
import Head from 'next/head'
import { Input } from 'components/Input'
import { BsArrowRightShort } from 'react-icons/bs'
import { SlideFade } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function Portal() {
  function handleFormLogin(event: FormEvent) {
    event.preventDefault()
  }
  return (
    <>
      <Head>
        <title>Portal Associação- Ajuda ai</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div id={styles.pageAuth}>
        <main>
          <SlideFade in={true} offsetY="-20px" className={styles.mainContent}>
            <img src="/images/logo.png" alt="AjudaAi" />

            <h1>Faça seu login</h1>
            <form onSubmit={handleFormLogin}>
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

              <Button type="submit">
                <FiLogIn />
                Entrar
              </Button>
            </form>
            <Link href="/admin/cadastrar">
              <a>
                <span> Não tenho cadastro </span>
                <BsArrowRightShort />
              </a>
            </Link>
          </SlideFade>
        </main>
        <aside>
          <SlideFade in={true} offsetY="20px">
            <img
              src="images/illustrationred.png"
              alt="Ilustração simbolizando perguntas e respostas"
            />
          </SlideFade>
        </aside>
      </div>
    </>
  )
}
