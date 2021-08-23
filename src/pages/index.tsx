import { Button } from '../components/Form/Button'
import { FiLogIn } from 'react-icons/fi'
import removeAccents from 'remove-accents'
import styles from '../styles/home.module.scss'
import Head from 'next/head'

import { Icon, SlideFade } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from 'services/api'
import { GetServerSideProps } from 'next'
import { Input } from '../components/Form/Input'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
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
  const [isError, setIsError] = useState(null)
  const router = useRouter()

  const handleCity = async event => {
    event.preventDefault()

    if (city === '') {
      setIsError({
        message: 'Procure por sua cidade'
      })
      return
    }
    const [{ name, slug, id }] = cities.filter(item => {
      if (item.name === city) return item.id
    })
    setCookie(undefined, 'ajudaai.cityId', id, {
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
    setCookie(undefined, 'ajudaai.cityName', name, {
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
    setCookie(undefined, 'ajudaai.citySlug', slug, {
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
    setIsSubmitting(true)
    await router.push(`/associations/${slug}`)
    setIsSubmitting(false)
  }
  function isAreTypingNow(e) {
    setCity(e.target.value)
    setIsError(null)
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
                onChange={e => isAreTypingNow(e)}
                value={city}
                mb="2"
                onFocus={() => setZIndex(-10)}
                error={isError}
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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cookies = parseCookies(ctx)
  const id = cookies['ajudaai.cityId']
  const slug = cookies['ajudaai.citySlug']

  if (id) {
    return {
      redirect: {
        destination: `/associations/${slug}`,
        permanent: false
      }
    }
  }

  const { data } = await api.get('/cities', {
    params: {
      _limit: 10
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
    }
    // revalidate: 60 * 60 * 5
  }
}
