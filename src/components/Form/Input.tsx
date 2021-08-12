import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react'
import { FieldErrors } from 'react-hook-form'
import { FiAlertCircle } from 'react-icons/fi'
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
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Box flexDirection="row" alignItems="center" display="flex">
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

        {!!error && (
          <Tooltip label={error.message} bg="red.500">
            <FormErrorMessage ml={-6} mt={0} zIndex="tooltip">
              <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
            </FormErrorMessage>
          </Tooltip>
        )}
        {isWideVersion && (
          <FormErrorMessage ml={-6} mt={0} zIndex="tooltip">
            <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
          </FormErrorMessage>
        )}
      </Box>
    </FormControl>
  )
}
