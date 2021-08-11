import { Button } from '../components/Form/Button'
import { FiLogIn } from 'react-icons/fi'
import removeAccents from 'remove-accents'
import styles from '../styles/home.module.scss'
import Head from 'next/head'

import { Icon, SlideFade } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { api } from 'services/api'
import { GetServerSideProps, GetStaticProps } from 'next'
import { Input } from '../components/Form/Input'

type City = {
  id: string
  name: string
  slug: string
}

type HomeProps = {
  cities: City[]
}

export default function Home({ cities }: HomeProps) {
  const [city, setCity] = useState('')
  const [zIndex, setZIndex] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleCity = async event => {
    event.preventDefault()
    const [{ slug }] = cities.filter(item => {
      if (item.name === city) return item.id
    })

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    router.push(`/associations/${slug}`)
  }
  function onChangeSetCity(name) {
    setCity(name)
    setZIndex(1)
  }
  return (
    <>
      <Head>
        <title>Ajuda ai</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div id={styles.pageAuth}>
        <aside>
          <SlideFade in={true} offsetY="20px">
            <img
              src="images/illustration.png"
              alt="Ilustração simbolizando perguntas e respostas"
            />
            <strong>
              Falta pouco para você alegrar o dia de alguém :{')'}
            </strong>
            <p>
              O AjudaAi é uma plataforma para conectar quem precisa de ajuda com
              quem queira ajudar!
            </p>
          </SlideFade>
        </aside>
        <main>
          <SlideFade in={true} offsetY="-20px" className={styles.mainContent}>
            <img src="/images/logo.png" alt="AjudaAi" />

            <div className={styles.titleSmartphone}>
              <strong>
                Falta pouco para você alegrar o dia de alguém :{')'}
              </strong>
              <p>
                O AjudaAi é uma plataforma para conectar quem precisa de ajuda
                com quem queira ajudar!
              </p>
            </div>
            <form onSubmit={handleCity}>
              <Input
                type="text"
                placeholder="Nome da cidade"
                name="city"
                label="Encontre Associações em sua Cidade"
                onChange={e => setCity(e.target.value)}
                value={city}
                mb="2"
                onFocus={() => setZIndex(-10)}
              />
              <div className={styles.suggestions}>
                {cities
                  .filter(name => {
                    if (city == '') {
                      return false
                    } else if (
                      removeAccents(name.name).toLowerCase() ===
                      removeAccents(city.toLowerCase())
                    )
                      return false
                    else if (
                      removeAccents(name.name)
                        .toLowerCase()
                        .includes(removeAccents(city.toLowerCase()))
                    ) {
                      return name
                    }
                  })
                  .map(filteredName => (
                    <div>
                      <button
                        type="button"
                        onClick={() => onChangeSetCity(filteredName.name)}
                      >
                        {filteredName.name}
                      </button>
                    </div>
                  ))}
              </div>
              <Button
                type="submit"
                leftIcon={<Icon as={FiLogIn} />}
                isLoading={isSubmitting}
                zIndex={zIndex}
              >
                Procurar Associações
              </Button>
            </form>
          </SlideFade>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/cities', {
    params: {
      _limit: 5
    }
  })
  const cities = data.map(city => ({
    id: city._id,
    slug: city.slug,
    name: [city.name, city.uf].join('-')
  }))
  return {
    props: {
      cities
    },
    revalidate: 60 * 60 * 5
  }
}
