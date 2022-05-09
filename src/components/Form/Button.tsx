import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from '@chakra-ui/react'

import { ReactNode } from 'react'

interface ButtonProps extends ChakraButtonProps {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      size="lg"
      colorScheme="purple"
      borderRadius="8px"
      {...rest}
      _hover={{
        color: 'var(--gray-100)'
      }}
    >
      {children}
    </ChakraButton>
  )
}
