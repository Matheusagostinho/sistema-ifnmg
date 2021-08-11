import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import styles from './header.module.scss'
import { ModalLogin } from 'components/ModalLogin'
import { useAuth } from 'hooks/useAuth'

export function Header() {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
    <header className={styles.header}>
      <Link href="/">
        <img src="/images/logo.png" alt="AjudaAi" />
      </Link>
      <div className={styles.buttons}>
        <HStack
          spacing={['6', '8']}
          mx={['6', '8']}
          pr={['4', '6']}
          py="1"
          borderRightWidth={1}
          borderColor="gray.500"
        >
          <Link href="">
            <a>Sobre</a>
          </Link>
        </HStack>

        {!user ? (
          <Button onClick={onOpen} colorScheme="red" size="sm" variant="solid">
            Login
          </Button>
        ) : (
          <Flex align="center">
            {isWideVersion && (
              <Box mr="4" textAlign="right">
                <Text color="black">{user.name}</Text>
                <Text color="gray.400" fontSize="small">
                  {user.email}
                </Text>
              </Box>
            )}
            <Avatar size="md" name={user.name} src={user.avatar} />
          </Flex>
        )}
      </div>
      <ModalLogin isOpen={isOpen} onClose={onClose} />
    </header>
  )
}
