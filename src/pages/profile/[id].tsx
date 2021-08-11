import { IconButton, SlideFade, Stack, Checkbox } from '@chakra-ui/react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { Header } from '../../components/Header'
import { Button } from '../../components/Form/Button'
import styles from '../../styles/profile.module.scss'
import { useState } from 'react'
import { Input } from 'components/Input'
import { api } from 'services/api'
type Association = {
  id: string
  name: string
  description: string
  urlImage: string
  phone: string
  since: string
  about: string
}
type DataProps = {
  association: Association
}
export default function ProfileAssociation({ association }: DataProps) {
  const [formDonate, setFormDonate] = useState(false)

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main>
          <div className={styles.aside}>
            <img src={association.urlImage} alt="Imagem da associação" />
            <h2> {association.name}</h2>
            <span>Ajudando desde {association.since}</span>
            <h3>Contato:</h3>
            <p>{association.phone}</p>
          </div>
          <div className={styles.content}>
            <SlideFade
              in={formDonate === false ? true : false}
              offsetY="20px"
              unmountOnExit
            >
              <h2>Sobre:</h2>
              <div>
                <p>{association.about}</p>
              </div>
              <h2>Projetos sociais:</h2>
              <h2>Campanhas:</h2>
              <h2>Conheça mais sobre nós:</h2>
            </SlideFade>
            <SlideFade in={formDonate} offsetY="200px" unmountOnExit>
              <form className={styles.formDonor}>
                <div>
                  <h3>Dados de Retirada</h3>
                  <Input placeholder="Seu Nome" />
                  <Input placeholder="Telefone" />
                  <Input placeholder="Rua" />

                  <div className={styles.locale01}>
                    <Input placeholder="Bairro" />
                    <Input placeholder="Numero" />
                  </div>
                </div>
                <div>
                  <h3>Data de Retirada</h3>
                  <div className={styles.locale01}>
                    <Input type="date" placeholder="Data" />
                    <Input type="time" placeholder="Horário" />
                  </div>
                </div>
                <div>
                  <h3>O que irá doar?</h3>
                  <Stack spacing={5} className={styles.donate}>
                    <Checkbox colorScheme="red" size="lg">
                      Alimentos não perecíveis
                    </Checkbox>
                    <Checkbox colorScheme="red" size="lg">
                      Alimentos perecíveis
                    </Checkbox>
                    <Checkbox colorScheme="red" size="lg">
                      Roupas
                    </Checkbox>
                    <Checkbox colorScheme="red" size="lg">
                      Brinquedos
                    </Checkbox>
                    <Checkbox colorScheme="red" size="lg" co>
                      Outros
                    </Checkbox>
                  </Stack>
                </div>
              </form>
            </SlideFade>
          </div>
        </main>
        <footer>
          {formDonate ? (
            <>
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label="Send email"
                onClick={e => setFormDonate(false)}
                icon={<BsArrowLeftShort size="2.5rem" />}
                marginRight="1rem"
                borderRadius="8px"
                h={['42px', '45px']}
                w={['42px', '45px']}
              />
              <Button
                type="button"
                onClick={e => setFormDonate(false)}
                w="320px"
              >
                Finalizar Doação :D
              </Button>
            </>
          ) : (
            <Button type="button" onClick={e => setFormDonate(true)} w="320px">
              Doe sem sair de casa :{')'}
            </Button>
          )}
        </footer>
      </div>
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await api.get('/associations/pirapora-mg', {
//     params: {
//       __limit: 6
//     }
//   })

//   const paths = data.map(association => ({
//     params: {
//       id: association._id
//     }
//   }))

//   return {
//     paths,
//     fallback: 'blocking'
//   }
// }

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.params
  const { data } = await api.get(`/profile/${id}`, {})

  const association = {
    id: data._id,
    name: data.name,
    description: data.description,
    urlImage: data.url_image,
    phone: data.phone,
    since: data.since,
    about: data.about
  }

  return {
    props: {
      association
    },
    revalidate: 60 * 30 // 30 minutes
  }
}
