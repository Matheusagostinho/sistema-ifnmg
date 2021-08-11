import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  colors: {
    white: '#EDEDF2',
    black: '#13131a',
    gray: {
      1: '#fff'
    },
    red: {
      300: '#f53b5a',
      500: '#e02041',
      600: '#be1b36',
      700: '#a31830',
      800: '#94152b'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black'
      }
    }
  }
})
export default theme
