import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { BiRightArrowAlt } from 'react-icons/bi'
import styles from '../styles/associations.module.scss'

export default function Cards() {
  return (
    <Link href="/">
      <Box
        as="a"
        width="100%"
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        h="80px"
        maxWidth="390px"
        display="flex"
        justifyContent="row"
        paddingY="5px"
        borderColor="gray.300"
        marginY="5px"
        className={styles.card}
      >
        <Flex
          marginLeft="0.8rem"
          borderRight="1px"
          marginY="5px"
          borderColor="gray.300"
          alignItems="center"
          justifyItems="center"
          paddingRight="1rem"
        >
          <Box
            w="4.8rem"
            h="4.8rem"
            borderRadius="50%"
            boxShadow="xs"
            bgColor="purple.500"
          ></Box>
        </Flex>
        <Flex
          flex="1"
          justifyContent="flex-start"
          marginX="1rem"
          flexDirection="column"
          lineHeight="short"
          justifyItems="center"
          marginY="auto"
        >
          <Text fontWeight="500"> Campanha de Arrecadação de Alimentos</Text>
          <Text
            fontWeight="normal"
            fontSize="1.2rem"
            color="gray.400"
            alignItems="center"
          >
            Conheça mais sobre essa campanha que visa arrecadar donativos
          </Text>
          <Text fontWeight="normal" fontSize="1.1rem" color="gray.400">
            Iniciativa:
            <Text marginLeft="5px" as="span" color="gray.500">
              Associação 01
            </Text>
          </Text>
        </Flex>
        <Flex alignItems="center" justifyItems="center" marginRight="0.8rem">
          <BiRightArrowAlt size={20} color="var(--red-500)" />
        </Flex>
      </Box>
    </Link>
  )
}
