import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useDisclosure,
  Link as LinkChakra,
  Image
} from '@chakra-ui/react'
import Link from 'next/link'
import styles from './header.module.scss'
import { ModalLogin } from 'components/ModalLogin'
import { useAuth } from 'hooks/useAuth'
import {
  RiArrowDownSLine,
  RiLogoutCircleLine,
  RiMenuLine,
  RiUserLine
} from 'react-icons/ri'
import { MdSwapHoriz } from 'react-icons/md'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import { FaRegAddressCard } from 'react-icons/fa'

interface HeaderProps {
  children?: ReactNode
}

export function Header({ children }: HeaderProps) {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  function toReplaceCity() {
    destroyCookie(undefined, 'ajudaai.cityId')
    destroyCookie(undefined, 'ajudaai.citySlug')
    destroyCookie(undefined, 'ajudaai.cityName')
    router.push('/')
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image w={['100px', '132px']} src="/images/logo.png" alt="AjudaAi" />
      </Link>
      <Box>{children}</Box>
      <div className={styles.buttons}>
        {!user && (
          <HStack
            spacing={['2', '4']}
            mx={['2', '4']}
            pr={['2', '4']}
            py="1"
            borderRightWidth={1}
            borderColor="gray.500"
          >
            <Menu colorScheme="red" size="10px">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<RiMenuLine size="25" />}
                variant="outline"
                bgColor="transparent"
                borderWidth="0"
                borderRadius="6px"
              />
              <MenuList zIndex="tooltip">
                <MenuItem icon={<FaRegAddressCard />}>
                  Sobre a Plataforma
                </MenuItem>
                <MenuItem icon={<MdSwapHoriz />} onClick={toReplaceCity}>
                  Trocar de Cidade
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        )}

        {!user ? (
          <Button onClick={onOpen} colorScheme="red" size="sm" variant="solid">
            Login
          </Button>
        ) : (
          <Flex align="center">
            <Avatar size="md" name={user.name} src={user.avatar} />

            {isWideVersion && (
              <Box mr="4" textAlign="left">
                <Text color="black">{user.name}</Text>
                <Text color="gray.400" fontSize="small">
                  {user.email}
                </Text>
              </Box>
            )}

            <Menu colorScheme="red" size="10px">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<RiArrowDownSLine size="25" />}
                variant="outline"
                bgColor="transparent"
                borderWidth="0"
                borderRadius="6px"
              />
              <MenuList zIndex="tooltip">
                <MenuItem icon={<RiUserLine />}>Perfil</MenuItem>
                <MenuItem icon={<FaRegAddressCard />}>
                  Sobre a Plataforma
                </MenuItem>
                <MenuItem icon={<MdSwapHoriz />} onClick={toReplaceCity}>
                  Trocar de Cidade
                </MenuItem>
                <MenuItem icon={<RiLogoutCircleLine />} onClick={signOut}>
                  Sair
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </div>
      <ModalLogin isOpen={isOpen} onClose={onClose} />
    </header>
  )
}
