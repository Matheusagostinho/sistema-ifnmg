import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  Text,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react'
import {
  Children,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useState
} from 'react'
import { FieldErrors } from 'react-hook-form'
import { FiAlertCircle } from 'react-icons/fi'
import ReactInputMask from 'react-input-mask'
interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldErrors
  isBgWhite?: boolean
  mask?: string
  colorLabel?: string
  children?: ReactNode
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    label,
    error,
    isBgWhite = false,
    mask = null,
    children,
    colorLabel,
    ...rest
  },
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
          <InputGroup size="lg">
            <ChakraInput
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
                borderColor: 'purple.500',
                borderWidth: '1px'
              }}
              size="lg"
              ref={ref}
              {...rest}
            />
            {children}
          </InputGroup>

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

export const InputRef = forwardRef(InputBase)
