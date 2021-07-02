import { IconButton, SlideFade, Stack, Checkbox } from '@chakra-ui/react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { NextPageContext } from 'next'
import { Header } from '../../../components/Header'
import { Button } from '../../../components/Button'
import styles from '../../../styles/profile.module.scss'
import { useState } from 'react'
import { Input } from 'components/Input'
type dataProps = {
  id: string
}
export default function ProfileAssociation(props: dataProps) {
  const [formDonate, setFormDonate] = useState(false)
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main>
          <div className={styles.aside}>
            <img src="/images/image.png" alt="Imagem da associação" />
            <h2> Associação 01</h2>
            <span>Ajudando desde 2019</span>
            <h3>Contato:</h3>
            <p>(38) 99901-0101</p>
          </div>
          <div className={styles.content}>
            <SlideFade
              in={formDonate === false ? true : false}
              offsetY="20px"
              unmountOnExit
            >
              <h2>Sobre:</h2>
              <div>
                <p></p>
              </div>
              <h2>Projetos sociais:</h2>
              <h2>Campanhas:</h2>
              <h2>Conheça mais sobre nós:</h2>
            </SlideFade>
            <SlideFade in={formDonate} offsetY="20px" unmountOnExit>
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
                    <Checkbox colorScheme="red" size="lg">
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
                h="48px"
                borderRadius="8px"
                w="48px"
                marginBottom="8px"
              />
              <Button type="button" onClick={e => setFormDonate(false)}>
                Finalizar Doação :D
              </Button>
            </>
          ) : (
            <Button type="button" onClick={e => setFormDonate(true)}>
              Doe sem sair de casa :{')'}
            </Button>
          )}
        </footer>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: '01'
        }
      }
    ],
    fallback: true
  }
}

export async function getStaticProps(context) {
  const id = context.params.id

  return {
    props: {
      id: id
    }
  }
}
