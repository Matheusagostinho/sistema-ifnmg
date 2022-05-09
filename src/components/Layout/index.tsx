import {
  Flex,
  Input,
  Text,
  Icon,
  HStack,
  Box,
  Avatar,
  useBreakpointValue,
  IconButton,
  Container,
  useDisclosure
} from '@chakra-ui/react'
import { Menu } from 'components/Menu'
import { ReactNode } from 'react'
import {
  RiSearch2Line,
  RiNotificationLine,
  RiUserAddLine,
  RiMenuLine
} from 'react-icons/ri'

import { Logo } from './Logo'
import { Notification } from './Notification'
import { Profile } from './Profile'
import { Search } from './Search'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Flex
        as="header"
        w="100%"
        h={['64', '52']}
        mx="auto"
        marginBottom="6"
        align="top"
        paddingTop={6}
        px="6"
        bg="green.500"
        top="0"
        left="0"
        right="0"
        justifyContent="stretch"
        alignItems="flex-start"
        position="relative"
      >
        <Flex h="56px" w="100%" display="flex" alignItems="center">
          {!isWideVersion && (
            <IconButton
              icon={<Icon as={RiMenuLine} fontSize="20" />}
              fontSize="24"
              color="gray.100"
              variant="unstyled"
              onClick={onOpen}
              aria-label="Open navigation"
              mr="2"
            ></IconButton>
          )}
          <Logo />
          <Menu isOpen={isOpen} onClose={onClose} />
          <Flex ml="auto">
            <Profile showProfileDate={isWideVersion} />
          </Flex>
        </Flex>
      </Flex>
      <Container
        display="flex"
        maxW="1092px"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        mb="12"
      >
        {children}
      </Container>
    </>
  )
}
