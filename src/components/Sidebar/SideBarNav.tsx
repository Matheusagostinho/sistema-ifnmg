import { Flex, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { NavLink } from './NavLink'
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
  RiStarLine
} from 'react-icons/ri'
import { NavSection } from './NavSection'
import { BiCalendarCheck } from 'react-icons/bi'
import { FaRegAddressCard } from 'react-icons/fa'
import { AiFillProject, AiFillSetting } from 'react-icons/ai'

export function SideBarNav() {
  return (
    <Stack spacing="8" align="flex-start">
      <NavSection title="Dashboard">
        <NavLink icon={BiCalendarCheck} href="/admin/dashboard">
          Agendamentos
        </NavLink>
        <NavLink icon={RiContactsLine} href="/admin/doadores">
          Doadores
        </NavLink>
      </NavSection>

      <NavSection title="Associação">
        <NavLink icon={RiStarLine} href="/admin/campanhas">
          Campanhas
        </NavLink>
        <NavLink icon={FaRegAddressCard} href="/admin/sobre">
          Sobre
        </NavLink>
        <NavLink icon={AiFillProject} href="/admin/projetos">
          Projetos
        </NavLink>
        <NavLink icon={AiFillSetting} href="/admin/configuracoes">
          Configurações
        </NavLink>
      </NavSection>
    </Stack>
  )
}
