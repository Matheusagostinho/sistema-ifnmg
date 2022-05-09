import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Icon,
  Textarea as ChakraTextArea,
  InputGroup,
  TextareaProps as ChakraTextareaProps,
  Text,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react'
import InputMask from 'react-input-mask'

import { FieldError } from 'react-hook-form'
import { ReactNode } from 'react'
interface TextareaProps extends ChakraTextareaProps {
  name: string
  label?: string
  error?: FieldError
  isBgWhite?: boolean
  mask?: string
  children?: ReactNode
  colorLabel?: string
}

export function Textarea({
  name,
  label,
  error = null,
  isBgWhite = false,
  mask = null,
  children,
  colorLabel = null,
  ...rest
}: TextareaProps) {
  const isPhoneVersion = useBreakpointValue({
    base: true,
    lg: false
  })

  return (
    <>
      <FormControl isInvalid={!!error}>
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
        <InputGroup size="lg">
          <ChakraTextArea
            {...rest}
            name={name}
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
          />
          {children}
        </InputGroup>
      </FormControl>
    </>
  )
}
