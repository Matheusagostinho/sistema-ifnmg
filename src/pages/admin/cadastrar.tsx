import Link from 'next/link'
import { Button } from '../../components/Form/Button'
import { FiLogIn } from 'react-icons/fi'
import styles from '../../styles/admin.module.scss'
import Head from 'next/head'
import { Input } from 'components/Input'
import { BsArrowLeftShort } from 'react-icons/bs'
import { Icon, SlideFade } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function Register() {
  function handleFormLogin(event: FormEvent) {
    event.preventDefault()
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
            <form onSubmit={handleFormLogin}>
              <Input
                type="email"
                placeholder="Nome da Associação"
                // onChange={}
                // value={}
              />
              <Input
                type="text"
                placeholder="Nome do Completo do Dirigente"
                // onChange={}
                // value={}
              />
              <Input
                type="text"
                placeholder="E-mail"
                // onChange={}
                // value={}
              />
              <Input
                type="text"
                placeholder="WhatsApp"
                // onChange={}
                // value={}
              />
              <Input
                type="text"
                placeholder="Rua"
                // onChange={}
                // value={}
              />
              <div className={styles.locale}>
                <Input
                  type="text"
                  placeholder="Bairro"
                  // onChange={}
                  // value={}
                />
                <Input
                  type="text"
                  placeholder="Número"
                  // onChange={}
                  // value={}
                />
              </div>
              <div className={styles.locale01}>
                <Input
                  type="text"
                  placeholder="Cidade"
                  // onChange={}
                  // value={}
                />
                <Input
                  type="text"
                  placeholder="UF"
                  // onChange={}
                  // value={}
                />
              </div>
              <div className={styles.locale02}>
                <Input
                  type="password"
                  placeholder="Senha"
                  // onChange={}
                  // value={}
                />
                <Input
                  type="password"
                  placeholder="Repita a senha"
                  // onChange={}
                  // value={}
                />
              </div>
              <Button
                type="submit"
                leftIcon={<Icon as={FiLogIn} />}
                //isLoading={formState.isSubmitting}
                w="100%"
                mt="2"
              >
                Cadastrar
              </Button>
            </form>
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
