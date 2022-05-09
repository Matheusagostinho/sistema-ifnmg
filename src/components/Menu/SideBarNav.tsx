import { Flex, HStack, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { NavLink } from './NavLink'

import { BiCalendarCheck } from 'react-icons/bi'
import { FaRegAddressCard } from 'react-icons/fa'
import { AiFillSetting, AiFillProject } from 'react-icons/ai'

export function SideBarNav({ isDrawerSideBar = false }) {
  return (
    <Stack
      spacing="1"
      align="flex-start"
      direction={isDrawerSideBar ? 'column' : 'row'}
    >
      <NavLink icon={BiCalendarCheck} href="/students">
        Alunos
      </NavLink>

      <NavLink icon={FaRegAddressCard} href="/edicts">
        Editais
      </NavLink>
      <NavLink icon={AiFillProject} href="users">
        Usuários
      </NavLink>
      <NavLink icon={AiFillSetting} href="settings">
        Configurações
      </NavLink>
    </Stack>
  )
}
