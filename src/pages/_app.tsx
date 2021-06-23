import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import NextNProgress from 'nextjs-progressbar'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        color="#E02041"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
