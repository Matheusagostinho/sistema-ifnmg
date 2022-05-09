import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Icon,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  Text,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react'
import InputMask from 'react-input-mask'

import { FieldError } from 'react-hook-form'
import { FiAlertCircle } from 'react-icons/fi'
import { Children, ReactNode } from 'react'
interface InputProps extends ChakraSelectProps {
  name: string
  label?: string
  error?: FieldError
  isBgWhite?: boolean
  mask?: string
  children: ReactNode
  colorLabel?: string
}

export function Select({
  name,
  label,
  error = null,
  isBgWhite = false,
  mask = null,
  children,
  colorLabel = null,
  ...rest
}: InputProps) {
  const isPhoneVersion = useBreakpointValue({
    base: true,
    lg: false
  })
  const { w } = rest
  return (
    <>
      <FormControl isInvalid={!!error} maxW={w}>
        {!!label && (
          <FormLabel
            htmlFor={name}
            color={
              !!colorLabel ? colorLabel : ['gray.500', 'gray500', 'gray.300']
            }
          >
            {label}
          </FormLabel>
        )}
        <Box flexDirection="row" alignItems="center" display="flex">
          <ChakraSelect
            {...rest}
            name={name}
            w={w}
            id={name}
            focusBorderColor="purple.500"
            bgColor={isBgWhite ? 'gray.50' : 'gray.1'}
            borderColor={isBgWhite ? 'gray.100' : ''}
            borderWidth={isBgWhite ? '1px' : '0px'}
            variant="filled"
            _hover={{
              bgColor: 'gray.50'
            }}
            _focus={{
              bgColor: 'gray.1',
              borderColor: 'purple.500',
              borderWidth: '1px'
            }}
            size="lg"
          >
            {children}
          </ChakraSelect>
          {!!error && (
            <Tooltip label={error.message} bg="red.500" hasArrow>
              <FormErrorMessage ml={-6} mt={0} zIndex="tooltip">
                <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
              </FormErrorMessage>
            </Tooltip>
          )}
        </Box>
      </FormControl>
    </>
  )
}
