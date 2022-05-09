import { Avatar, Box, Text } from '@chakra-ui/react'

export function Comments() {
  return (
    <Box w="100%" bgColor="gray.1" borderRadius="8" p="6">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar name="Alessandro" mr="2" />
          <Box>
            <Text mb="-3">Alessandro</Text>
            <Text color="gray.600">Professor</Text>
          </Box>
        </Box>
        <Text>22/03/2022</Text>
      </Box>
      <Text color="gray.500" mt="4" mx="4">
        O Aluno não está comparecendo as aulas de Desenvolvimento Web.
        <br></br> O mesmo já consta 5 faltas seguidas e não está entregando os
        trabalhos também.
      </Text>
    </Box>
  )
}
