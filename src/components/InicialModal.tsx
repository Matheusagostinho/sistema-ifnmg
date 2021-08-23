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
  Icon
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface InicialModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function InicialModal({ isOpen, onClose, children }: InicialModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
