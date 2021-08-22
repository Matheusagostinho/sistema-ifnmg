import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import {
  RiArrowDownSLine,
  RiLogoutCircleLine,
  RiUserLine
} from 'react-icons/ri'
import { signOut } from 'next-auth/client'
import { useAssociation } from 'hooks/useAssoctiation'
interface ProfileProps {
  showProfileDate?: boolean
}

export function Profile({ showProfileDate = true }: ProfileProps) {
  const { association } = useAssociation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex align="center">
      {showProfileDate && (
        <Box mr="4" textAlign="right">
          <Text color="gray.50">{association?.director}</Text>
          <Text color="red.200" fontSize="small">
            {association?.email}
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name={association?.director}
        src={association?.url_image}
      />
      <Menu size="10px">
        <MenuButton
          as={IconButton}
          colorScheme="gray"
          aria-label="Options"
          icon={<RiArrowDownSLine size="25" />}
          variant="outline"
          bgColor="transparent"
          borderWidth="0"
          borderRadius="6px"
          ml="2"
        />
        <MenuList zIndex="tooltip">
          <MenuItem icon={<RiUserLine />}>Perfil</MenuItem>
          <MenuItem icon={<RiLogoutCircleLine />} onClick={() => signOut()}>
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
