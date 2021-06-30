import { Button, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import styles from '../styles/header.module.scss'
import { ModalLogin } from 'components/ModalLogin'

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <header className={styles.header}>
      <Link href="/">
        <img src="/images/logo.png" alt="AjudaAi" />
      </Link>
      <div className={styles.buttons}>
        <Link href="">
          <a>Sobre</a>
        </Link>
        <Button onClick={onOpen} colorScheme="red" size="lg" variant="solid">
          Login
        </Button>
      </div>
      <ModalLogin isOpen={isOpen} onClose={onClose} />
    </header>
  )
}
