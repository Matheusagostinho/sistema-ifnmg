import {
  ButtonGroup,
  Editable,
  EditablePreview,
  Flex,
  FormLabel,
  Icon,
  IconButton,
  useEditableControls
} from '@chakra-ui/react'
import { ReactNode } from 'react'

import { RiCheckLine, RiCloseLine, RiPencilLine } from 'react-icons/ri'
import { Input } from './Input'

interface EditableInputProps {
  label: string
  children: ReactNode
}
export function ModifyInput({ label, children }: EditableInputProps) {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup
        justifyContent="center"
        size="sm"
        display="flex"
        as="div"
        ml="2"
      >
        <IconButton
          aria-label="ICon"
          icon={<Icon as={RiCheckLine} />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="ICon"
          icon={<Icon as={RiCloseLine} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="ICon"
          size="sm"
          icon={<Icon as={RiPencilLine} />}
          {...getEditButtonProps()}
        />
      </Flex>
    )
  }

  return (
    <Editable fontSize="2xl" isPreviewFocusable={false}>
      <FormLabel htmlFor="name"> {label}</FormLabel>
      <Flex align="center">
        <EditablePreview
          bgColor="gray.50"
          minWidth="90%"
          height="46px"
          borderColor="gray.100"
          borderWidth="1px"
          flex="1"
          px="1rem"
          py="0.4rem"
        />
        {children}
        <EditableControls />
      </Flex>
    </Editable>
  )
}
