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
    <ChakraButton size="lg" colorScheme="red" borderRadius="8px" {...rest}>
      {children}
    </ChakraButton>
  )
}
