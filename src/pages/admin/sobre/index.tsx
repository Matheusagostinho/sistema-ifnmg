import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  useEditableControls,
  useToast,
  VStack
} from '@chakra-ui/react'
import InputMask from 'react-input-mask'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from 'react-query'

import { Header } from '../../../components/HeaderAdmin'
import { Sidebar } from '../../../components/Sidebar'
import { Input } from '../../../components/Form/Input'

import { api } from '../../../services/api'
import { queryClient } from '../../../services/queryClient'
import { LayoutOutAdmin } from 'components/LayoutAdmin'
import { FileInput } from 'components/Form/FileInput'
import { useState } from 'react'
import {
  RiCheckboxLine,
  RiCheckLine,
  RiCloseLine,
  RiPencilLine
} from 'react-icons/ri'
import { ModifyInput } from 'components/Form/ModifyInput'
import { getSession } from 'next-auth/client'

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface NewImageData {
  url: string
  title: string
  description: string
}
const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
  const [imageUrl, setImageUrl] = useState('')
  const [localImageUrl, setLocalImageUrl] = useState('')
  const toast = useToast()

  const acceptedFormatsRegex = /(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#](?:jpeg|gif|png))(?:\?([^#]*))?(?:#(.*))?/g

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: fileList =>
          fileList[0].size < 10000000 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: fileList =>
          acceptedFormatsRegex.test(fileList[0].type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF'
      }
    },
    title: {
      required: 'Título obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres'
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres'
      }
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres'
      }
    }
  }

  const queryClient = useQueryClient()
  const mutation = useMutation(
    async (image: NewImageData) => {
      await api.post('/api/images', {
        ...image,
        url: imageUrl
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images')
      }
    }
  )

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger
  } = useForm()
  const { errors } = formState
  const onSubmit = async (data: NewImageData): Promise<void> => {
    try {
      if (!imageUrl) {
        toast({
          status: 'error',
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.'
        })
        return
      }
      await mutation.mutateAsync(data)
      toast({
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso.',
        status: 'success'
      })
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        status: 'error'
      })
    } finally {
      reset()
      setImageUrl('')
      setLocalImageUrl('')
    }
  }
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
    <LayoutOutAdmin>
      <Heading size="lg" fontWeight="normal">
        Dados da Associação
      </Heading>

      <Divider my="6" borderColor="gray.700" />

      <VStack spacing={['6', '8']}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image', formValidations.image)}
          error={errors.image}
        />
        <SimpleGrid
          as="form"
          minChildWidth="220px"
          spacing={['6', '8']}
          w="100%"
        >
          <ModifyInput label="Nome da Associação">
            <EditableInput
              as={Input}
              error={errors.name}
              {...register('name')}
              isBgWhite
              bgColor="gray.50"
              minWidth="100%"
              mr="3"
              display="block"
            />
          </ModifyInput>
          <ModifyInput label="WhatsApp">
            <EditableInput
              as={Input}
              mask="(99) 9 9999-9999"
              error={errors.phone}
              {...register('phone')}
              isBgWhite
              bgColor="gray.50"
              minWidth="100%"
              mr="3"
              display="block"
            />
          </ModifyInput>
        </SimpleGrid>
        <ModifyInput label="Sobre a Associação">
          <EditableInput
            as={Input}
            error={errors.description}
            {...register('description')}
            isBgWhite
            bgColor="gray.50"
            minWidth="100%"
            mr="3"
            display="block"
          />
        </ModifyInput>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Link href="/admin/doadores" passHref>
            <Button as="a" colorScheme="blackAlpha">
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            colorScheme="red"
            isLoading={formState.isSubmitting}
          >
            Salvar
          </Button>
        </HStack>
      </Flex>
    </LayoutOutAdmin>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}
