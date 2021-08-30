import { Box, Icon, Image, Text, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { BsBoxArrowInRight } from 'react-icons/bs'
import { setInterval } from 'timers'
import { Button } from './Form/Button'
import { InicialModal } from './InicialModal'

export function ModalDashboard() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onOpen()
  }, [])
  return (
    <InicialModal isOpen={isOpen} onClose={onClose}>
      <Box
        h="100%"
        w="100%"
        display="flex"
        p="10"
        textAlign="center"
        flexDir="column"
      >
        <Image src="/images/data.svg" size="200px" />
        <Text fontSize="xl" lineHeight="1">
          Seu cadastro está incompleto!
        </Text>
        <Button
          mt="2"
          onClick={() => router.push('/admin/sobre')}
          rightIcon={<Icon as={BsBoxArrowInRight} fontSize="20" />}
          size="sm"
        >
          Complete Agora
        </Button>
      </Box>
    </InicialModal>
  )
}
