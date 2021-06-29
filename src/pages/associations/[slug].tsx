import { Wrap, WrapItem } from '@chakra-ui/react'
import Cards from 'components/Cards'
import { NextPageContext } from 'next'
import { Header } from '../../components/Header'
import styles from '../../styles/associations.module.scss'
type dataProps = {
  slug: 'string'
}
export default function Associations(props: dataProps) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1> Campanhas em {props.slug}</h1>
        <Wrap spacing="8px">
          <WrapItem>
            <Cards />
          </WrapItem>
          <WrapItem>
            <Cards />
          </WrapItem>
          <WrapItem>
            <Cards />
          </WrapItem>
          <WrapItem>
            <Cards />
          </WrapItem>
          <WrapItem>
            <Cards />
          </WrapItem>
          <WrapItem>
            <Cards />
          </WrapItem>
        </Wrap>
        <h1> Associações em {props.slug}</h1>
        <Wrap spacing="8px">
          <WrapItem>
            <Cards />
          </WrapItem>
          <WrapItem>
            <Cards />
          </WrapItem>
          <WrapItem>
            <Cards />
          </WrapItem>
        </Wrap>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: '1'
        }
      }
    ],
    fallback: true
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug

  return {
    props: {
      slug: slug
    }
  }
}
