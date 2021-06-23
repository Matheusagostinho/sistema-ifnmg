import { Button } from '../components/Button'
import { FiLogIn } from 'react-icons/fi'

import styles from '../styles/home.module.scss'
import Head from 'next/head'
import { Input } from 'components/Input'
import { ModalLogin } from 'components/ModalLogin'
import { useDisclosure, SlideFade } from '@chakra-ui/react'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Head>
        <title>Ajuda ai</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div id={styles.pageAuth}>
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
            <form>
              <Input type="text" placeholder="Nome da cidade" />
              <Button type="submit">
                <FiLogIn />
                Procurar Associações
              </Button>
            </form>
            {/* <Button onClick={onOpen}>Modal de login</Button> */}
            <ModalLogin isOpen={isOpen} onClose={onClose} />
          </SlideFade>
        </main>
      </div>
    </>
  )
}
