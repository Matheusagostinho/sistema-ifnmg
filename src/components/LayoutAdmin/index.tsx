import { Box, Flex } from '@chakra-ui/react'
import { Header } from 'components/HeaderAdmin'
import { Sidebar } from 'components/Sidebar'
import { ReactNode } from 'react'

interface LayoutOutAdminProps {
  children: ReactNode
  title?: string
}

export function LayoutOutAdmin({ children }: LayoutOutAdminProps) {
  return (
    <Box>
      <Header />
      <Flex w="100%" mt="20" maxWidth={1480} mx="auto" px="6" py="6">
        <Sidebar />
        <Box
          flex="1"
          bg="gray.1"
          borderRadius={8}
          p={['4', '6', '8']}
          marginLeft={['0', '0', '0', '230px', '250px']}
          borderColor="gray.300"
          borderWidth="1px"
        >
          {children}
        </Box>
      </Flex>
    </Box>
  )
}
