import {
  Flex,
  Input,
  Text,
  Icon,
  HStack,
  Box,
  Avatar,
  useBreakpointValue,
  IconButton
} from '@chakra-ui/react'
import {
  RiSearch2Line,
  RiNotificationLine,
  RiUserAddLine,
  RiMenuLine
} from 'react-icons/ri'
import { useSidebarDrawer } from '../../contexts/SidebarContext'
import { Logo } from './Logo'
import { Notification } from './Notification'
import { Profile } from './Profile'
import { Search } from './Search'

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const { onOpen } = useSidebarDrawer()
  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      mx="auto"
      marginBottom="6"
      align="center"
      px="6"
      bg="red.500"
      position="fixed"
      top="0"
      zIndex="docked"
      justify="center"
    >
      <Flex w="100%" maxWidth={1480}>
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

        <Flex align="center" ml="auto">
          <Profile showProfileDate={isWideVersion} />
        </Flex>
      </Flex>
    </Flex>
  )
}
