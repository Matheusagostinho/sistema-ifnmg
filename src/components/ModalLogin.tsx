import Link from 'next/link'

import styles from '../styles/modalLogin.module.scss'
import { Input } from './Input'
import { Button } from '../components/Button'
import { FiLogIn } from 'react-icons/fi'
import { BsArrowRightShort } from 'react-icons/bs'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

export function ModalLogin({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <div className={styles.container}>
            <div className={styles.content}>
              <button className={styles.createRoom}>
                <img src="/images/google-icon.svg" alt="AjudaAi" />
                Conectar com o Google
              </button>
              <div className={styles.separator}> ou entre com seu e-mail</div>
              <form>
                <Input type="text" placeholder="E-mail" />
                <Input type="text" placeholder="Senha" />
                <Button type="submit">
                  <FiLogIn />
                  Entrar
                </Button>
              </form>
              <Link href="/cadastro">
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
