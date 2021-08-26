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
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  SlideFade,
  Spinner,
  Text,
  Textarea,
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

import { Input } from '../../../components/Form/Input'

import { LayoutOutAdmin } from 'components/LayoutAdmin'
import { FileInput } from 'components/Form/FileInput'
import { useEffect, useState } from 'react'
import {
  RiCheckboxLine,
  RiCheckLine,
  RiCloseLine,
  RiPencilLine
} from 'react-icons/ri'
import { ModifyInput } from 'components/Form/ModifyInput'
import { getSession } from 'next-auth/client'
import { useAssociation } from 'hooks/useAssoctiation'
import { AssociationProps } from 'contexts/AssociationContex'
import connectToDatabase from 'utils/database'

type UpdateAssociationFormData = {
  name: string
  email: string
  phone: string
  street: string
  number: string
  district: string
  since: string
  people_assisted: string
  facebook: string
  instagram: string
  image: string
  description: string
  about: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido')
})

export default function CreateUser() {
  const [imageUrl, setImageUrl] = useState('')
  const [localImageUrl, setLocalImageUrl] = useState('')
  const toast = useToast()
  const { association, updatedAssociation } = useAssociation()

  useEffect(() => {
    setLocalImageUrl(association?.url_image)
    reset({
      name: association?.name,
      email: association?.email,
      phone: association?.phone,
      street: association?.address.street,
      number: association?.address.number,
      district: association?.address.district,
      since: association?.since,
      people_assisted: association?.people_assisted,
      facebook: association?.facebook,
      instagram: association?.instagram,
      description: association?.description,
      about: association?.about
    })

    setImageUrl(association?.url_image)
  }, [association])

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

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    setValue,
    watch,
    trigger
  } = useForm()
  const watchAllFields = watch()
  const { errors } = formState
  const onSubmit: SubmitHandler<UpdateAssociationFormData> = async values => {
    console.log('apertei')

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

      const data: AssociationProps = {
        ...association,
        name: values.name,

        phone: values.phone,
        address: {
          street: values.street,
          number: values.number,
          district: values.district
        },
        since: values.since,
        people_assisted: values.people_assisted,
        facebook: values.facebook,
        instagram: values.instagram,
        url_image: imageUrl,
        description: values.description,
        about: values.about
      }

      delete data._id

      await updatedAssociation(data)
      setImageUrl(imageUrl)
      setLocalImageUrl(imageUrl)

      toast({
        title: 'Cadastro Atualizado',
        description: 'Seus dados foram atualizados com sucesso.',
        status: 'success',
        isClosable: true,
        position: 'top-right'
      })
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar atualizar seus dados.',
        status: 'error',
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  function cancelUpdated() {
    reset()
    toast({
      title: 'Modificação Cancelada',

      status: 'info',
      isClosable: true,
      position: 'top-right'
    })
  }

  if (!association) {
    return (
      <LayoutOutAdmin>
        <Heading size="lg" fontWeight="normal">
          Dados da Associação
        </Heading>
        <Divider my="6" borderColor="gray.700" />
        <Box
          h="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
        >
          <Spinner size="md" mr="2" />
          <Text fontWeight="bold">Carregando</Text>
        </Box>
      </LayoutOutAdmin>
    )
  }

  return (
    <LayoutOutAdmin>
      <Heading size="lg" fontWeight="normal">
        Dados da Associação
      </Heading>

      <Divider my="6" borderColor="gray.700" />
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <SlideFade in={true} offsetY="20px">
          <VStack
            spacing={['6', '8']}
            w="100%"
            display="flex"
            align="center"
            justify="center"
            maxWidth="480px"
            mx="auto"
          >
            <FileInput
              name="image"
              setImageUrl={setImageUrl}
              localImageUrl={localImageUrl}
              setLocalImageUrl={setLocalImageUrl}
              setError={setError}
              trigger={trigger}
              {...register(
                'image',
                association?.url_image === '' && formValidations.image
              )}
              error={errors.image}
            />

            <Input
              name="name"
              type="text"
              label="Nome da Associação"
              isBgWhite
              error={errors.name}
              {...register('name')}
              value={watchAllFields.name}
            />
            <Box display="flex">
              <Grid templateColumns="repeat(6, 1fr)" gap={2} mb={['6', '8']}>
                <GridItem colSpan={3} h="10">
                  <Input
                    type="text"
                    label="Ano da fundação"
                    isBgWhite
                    error={errors.since}
                    {...register('since')}
                    value={watchAllFields.since}
                  />
                </GridItem>
                <GridItem colSpan={3} h="10">
                  <Input
                    type="number"
                    label="Número de pessoas assistidas"
                    isBgWhite
                    error={errors.people_assisted}
                    {...register('people_assisted')}
                    value={watchAllFields.people_assisted}
                  />
                </GridItem>
              </Grid>
            </Box>

            <Input
              mask="(99) 9 9999-9999"
              type="text"
              label="WhatsApp"
              isBgWhite
              error={errors.phone}
              {...register('phone')}
              value={watchAllFields.phone}
            />
            <Box w="100%">
              <FormLabel htmlFor="about">Breve descrição</FormLabel>
              <Textarea
                h="100px"
                name="about"
                focusBorderColor="red.500"
                bgColor={true ? 'gray.50' : 'gray.1'}
                borderColor={true ? 'gray.100' : ''}
                borderWidth={true ? '1px' : '0px'}
                variant="filled"
                _hover={{
                  bgColor: 'gray.50'
                }}
                _focus={{
                  bgColor: 'gray.1',
                  borderColor: 'red.500',
                  borderWidth: '1px'
                }}
                size="md"
                resize="vertical"
                error={errors.description}
                {...register('description')}
                value={watchAllFields.description}
              />
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="about">Sobre</FormLabel>
              <Textarea
                h="200px"
                name="about"
                focusBorderColor="red.500"
                bgColor={true ? 'gray.50' : 'gray.1'}
                borderColor={true ? 'gray.100' : ''}
                borderWidth={true ? '1px' : '0px'}
                variant="filled"
                _hover={{
                  bgColor: 'gray.50'
                }}
                _focus={{
                  bgColor: 'gray.1',
                  borderColor: 'red.500',
                  borderWidth: '1px'
                }}
                size="md"
                resize="vertical"
                error={errors.about}
                {...register('about')}
                value={watchAllFields.about}
              />
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="Links">Links das Redes Sociais</FormLabel>
              <InputGroup size="lg">
                <InputLeftAddon children="Facebook" bgColor="blue.200" />
                <Input
                  type="text"
                  isBgWhite
                  error={errors.facebook}
                  {...register('facebook')}
                  value={watchAllFields.facebook}
                />
              </InputGroup>
              <InputGroup size="lg" mt="4">
                <InputLeftAddon children="Instagram" bgColor="pink.200" />
                <Input
                  type="text"
                  isBgWhite
                  error={errors.instagram}
                  {...register('instagram')}
                  value={watchAllFields.instagram}
                />
              </InputGroup>
            </Box>
            <Input
              type="text"
              label="Rua"
              isBgWhite
              error={errors.street}
              {...register('street')}
              value={watchAllFields.street}
            />
            <Box display="flex">
              <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                <GridItem colSpan={4} h="10">
                  <Input
                    type="text"
                    label="Bairro"
                    isBgWhite
                    error={errors.district}
                    {...register('district')}
                    value={watchAllFields.district}
                  />
                </GridItem>
                <GridItem colSpan={2} h="10">
                  <Input
                    type="number"
                    label="Número"
                    isBgWhite
                    error={errors.number}
                    {...register('number')}
                    value={watchAllFields.number}
                  />
                </GridItem>
              </Grid>
            </Box>
          </VStack>
        </SlideFade>
        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Button
              as="a"
              colorScheme="blackAlpha"
              type="button"
              onClick={cancelUpdated}
              cursor="pointer"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              colorScheme="red"
              isLoading={formState.isSubmitting}
            >
              Salvar
            </Button>
          </HStack>
        </Flex>
      </Box>
    </LayoutOutAdmin>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}

// <ModifyInput label="WhatsApp">
//             <EditableInput
//               as={Input}
//               mask="(99) 9 9999-9999"
//               error={errors.phone}
//               {...register('phone')}
//               isBgWhite
//               bgColor="gray.50"
//               minWidth="100%"
//               mr="3"
//               display="block"
//             />
//           </ModifyInput>
