import { firebase } from '../services/firebase'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../styles/theme'
import NextNProgress from 'nextjs-progressbar'
import '../styles/global.scss'
import { SidebarDrawerProvider } from 'contexts/SidebarContext'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'services/queryClient'
import { AuthContextProvider } from 'contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        color="#E02041"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      />
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ChakraProvider theme={theme}>
            <SidebarDrawerProvider>
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              <Component {...pageProps} />
            </SidebarDrawerProvider>
          </ChakraProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
