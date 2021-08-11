import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileDate?: boolean
}

export function Profile({ showProfileDate = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileDate && (
        <Box mr="4" textAlign="right">
          <Text color="gray.50">Matheus Agostinho</Text>
          <Text color="red.200" fontSize="small">
            mhoa@aluno.ifnmng.edu.br
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Matheus Agostinho"
        src="https://github.com/Matheusagostinho.png"
      />
    </Flex>
  )
}
