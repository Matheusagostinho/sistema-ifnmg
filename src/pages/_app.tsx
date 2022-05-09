import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import 'rsuite/dist/rsuite.min.css'
import '../styles/global.scss'
import theme from '../styles/theme'
import NextNProgress from 'nextjs-progressbar'

import { QueryClientProvider } from 'react-query'
import { queryClient } from 'services/queryClient'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        color="#8257e5"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      />
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
