import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react'
import { SideBarNav } from './SideBarNav'

export function Menu({ isOpen, onClose }) {
  const isDrawerSideBar = useBreakpointValue({
    base: true,
    lg: false
  })

  if (isDrawerSideBar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="green.500" p="4">
          <DrawerCloseButton mt="6" color="gray.200" />
          <DrawerHeader color="gray.100">Navegação</DrawerHeader>
          <DrawerBody>
            <SideBarNav isDrawerSideBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Box height="100%" marginX="10" alignItems="center" display="flex">
      <Box as="aside">
        <SideBarNav />
      </Box>
    </Box>
  )
}
