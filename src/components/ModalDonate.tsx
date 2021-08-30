import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  ModalHeader,
  Box,
  Avatar,
  Text,
  VStack
} from '@chakra-ui/react'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { Donate } from 'services/hooks/useDonates'
import { Button } from './Form/Button'

interface ModalDonateProps {
  isOpen: boolean
  onClose: () => void
  infoDonate: Donate
  makeAsWithdrawn: (id: string) => void
}

export function ModalDonate({
  isOpen,
  onClose,
  infoDonate,
  makeAsWithdrawn
}: ModalDonateProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dados da doação</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="6" w="100%">
            <Box
              display="flex"
              alignItems={['flex-start', 'center']}
              w="100%"
              flexDir={['column', 'row']}
            >
              <Box display="flex" alignItems="center" mr="5" mb={['4', '0']}>
                <Avatar src={infoDonate?.url_image} name={infoDonate?.name} />
                <Box fontWeight="bold" lineHeight="1" ml="2">
                  <Text> {infoDonate?.name}</Text>
                  <Text color="gray.400"> {infoDonate?.email}</Text>
                </Box>
              </Box>
              <Box lineHeight="1">
                <Text fontWeight="bold" color="gray.500">
                  Telefone
                </Text>
                <Text>{infoDonate?.phone}</Text>
              </Box>
            </Box>
            <Box w="100%">
              <Text
                borderBottomColor="red.500"
                borderBottomWidth="1px"
                fontWeight="bold"
                pb="1"
              >
                Endereço
              </Text>
              <Text m="2" fontSize="lg">
                {infoDonate?.address?.street}, nº{infoDonate?.address?.number},{' '}
                {infoDonate?.address?.district} - {infoDonate?.address?.city}/
                {infoDonate?.address?.uf}
              </Text>
            </Box>
            <Box w="100%">
              <Text
                borderBottomColor="red.500"
                borderBottomWidth="1px"
                fontWeight="bold"
                pb="1"
              >
                Horário
              </Text>
              <Box m="2" fontSize="lg" display="flex">
                <Text color="gray.500">Data:</Text>
                <Text ml="1"> {infoDonate?.date}</Text>
                <Text ml="3" color="gray.500">
                  Horário:
                </Text>
                <Text ml="1"> {infoDonate?.hour}h</Text>
              </Box>
            </Box>
            <Box w="100%">
              <Text
                borderBottomColor="red.500"
                borderBottomWidth="1px"
                fontWeight="bold"
                pb="1"
              >
                {infoDonate.withdrawn
                  ? 'O que foi doado?'
                  : 'O que será doado?'}
              </Text>
              <Text m="2" fontSize="lg" display="flex">
                {infoDonate?.donate}
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blackAlpha"
            size="md"
            fontSize="md"
            mr={3}
            onClick={onClose}
          >
            Fechar
          </Button>
          {!infoDonate.withdrawn && (
            <Button
              as="a"
              size="md"
              fontSize="md"
              colorScheme="green"
              mr="1"
              type="button"
              onClick={() => makeAsWithdrawn(infoDonate._id)}
              cursor="pointer"
              leftIcon={<Icon as={RiCheckboxCircleLine} fontSize="16" />}
            >
              Retirado
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
