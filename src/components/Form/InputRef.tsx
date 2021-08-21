import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react'
import InputMask from 'react-input-mask'
import { forwardRef, ForwardRefRenderFunction, useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { FiAlertCircle } from 'react-icons/fi'
interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldErrors
  isBgWhite?: boolean
  mask?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, isBgWhite = false, mask = null, ...rest },
  ref
) => {
  const isPhoneVersion = useBreakpointValue({
    base: true,
    lg: false
  })

  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <Box flexDirection="row" alignItems="center" display="flex">
          <ChakraInput
            ref={ref}
            as={InputMask}
            mask={mask}
            name={name}
            id={name}
            focusBorderColor="red.500"
            bgColor={isBgWhite ? 'gray.50' : 'gray.1'}
            borderColor={isBgWhite ? 'gray.100' : ''}
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
            <Tooltip label={error.message} bg="red.400" hasArrow>
              <FormErrorMessage ml={-6} mt={0} zIndex="tooltip">
                <Icon as={FiAlertCircle} color="red.400" w={4} h={4} />
              </FormErrorMessage>
            </Tooltip>
          )}
        </Box>
      </FormControl>
    </>
  )
}

export const Input = forwardRef(InputBase)
