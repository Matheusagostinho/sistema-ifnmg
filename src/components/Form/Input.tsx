import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'
import { FieldErrors } from 'react-hook-form'
interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldErrors
  isBgWhite?: boolean
}

export function Input({
  name,
  label,
  error = null,
  isBgWhite = false,
  ...rest
}: InputProps) {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="red.500"
        bgColor={isBgWhite ? 'gray.50' : 'gray.1'}
        borderColor={isBgWhite ? 'gray.300' : ''}
        borderWidth={isBgWhite ? '1px' : '0px'}
        variant="filled"
        _hover={{
          bgColor: 'gray.50'
        }}
        _focus={{
          bgColor: 'gray.1',
          borderColor: 'red.500',
          borderWidth: '1px'
        }}
        size="lg"
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}
