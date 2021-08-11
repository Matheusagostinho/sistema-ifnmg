import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue
} from '@chakra-ui/react'
import { useSidebarDrawer } from '../../contexts/SidebarContext'
import { SideBarNav } from './SideBarNav'

export function Sidebar() {
  const isDrawerSideBar = useBreakpointValue({
    base: true,
    lg: false
  })
  const { isOpen, onClose, onOpen } = useSidebarDrawer()

  if (isDrawerSideBar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#221D25" p="4">
          <DrawerCloseButton mt="6" color="gray.200" />
          <DrawerHeader color="red.500">Navegação</DrawerHeader>
          <DrawerBody>
            <SideBarNav />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Box bg="#221D25" position="fixed" height="100%" ml="-6" top="20">
      <Box as="aside" mx="4" mt="6">
        <SideBarNav />
      </Box>
    </Box>
  )
}
