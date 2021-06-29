import { Button } from '../components/Button'
import { FiLogIn } from 'react-icons/fi'
import removeAccents from 'remove-accents'
import styles from '../styles/home.module.scss'
import Head from 'next/head'
import { Input } from 'components/Input'

import { SlideFade } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [city, setCity] = useState('')
  const cities = [
    { id: 1, name: 'Pirapora-MG' },
    { id: 2, name: 'Várzea da Palma-MG' },
    { id: 3, name: 'Buritizeiro-MG' },
    { id: 4, name: 'Janaúba-MG' }
  ]

  const router = useRouter()

  function handleCity(event: FormEvent) {
    event.preventDefault()
    router.push(`/associations/${city}`)
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
                onChange={e => setCity(e.target.value)}
                value={city}
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
                        onClick={e => setCity(filteredName.name)}
                      >
                        {filteredName.name}
                      </button>
                    </div>
                  ))}
              </div>
              <Button type="submit">
                <FiLogIn />
                Procurar Associações
              </Button>
            </form>
          </SlideFade>
        </main>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const data = {
    id: ['1', '2', '3'],
    name: ['Pirapora', 'Buritizeiro', 'Varzea da palma']
  }
  return {
    props: {
      cities: data
    }
  }
}
