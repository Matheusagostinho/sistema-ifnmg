import { HStack, Icon } from '@chakra-ui/react'
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri'

export function Notification() {
  return (
    <HStack
      spacing={['6', '8']}
      mx={['6', '8']}
      pr={['4', '6']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="red.200"
    >
      <Icon as={RiNotificationLine} />
    </HStack>
  )
}
