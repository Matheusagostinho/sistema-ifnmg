import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'
import {
  RiArrowDownSLine,
  RiLogoutCircleLine,
  RiUserLine
} from 'react-icons/ri'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
interface ProfileProps {
  showProfileDate?: boolean
}

export function Profile({ showProfileDate = true }: ProfileProps) {
  const router = useRouter()
  return (
    <Flex>
      {showProfileDate && (
        <Box mr="4" textAlign="right">
          <Text color="gray.50">Fernanda Antunes</Text>
          <Text color="gray.300" fontSize="small">
            Administrador(a)
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name={'Fernanda Antunes'}
        // src={association?.url_image}
      />
      <Menu size="10px">
        <MenuButton
          as={IconButton}
          colorScheme="green"
          aria-label="Options"
          icon={<RiArrowDownSLine size="25" />}
          bgColor="transparent"
          borderWidth="0"
          borderRadius="6px"
          ml="2"
        />
        <MenuList zIndex="tooltip">
          <MenuItem
            icon={<RiUserLine />}
            onClick={() => router.push('/admin/sobre')}
          >
            Perfil
          </MenuItem>
          <MenuItem icon={<RiLogoutCircleLine />} onClick={() => signOut()}>
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
