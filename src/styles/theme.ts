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
    green: {
      100: '#04D361',
      200: '#1dd438',
      300: '#2db341',
      500: '#309F41',
      600: '#238632',
      700: '#177024',
      800: '#0c5016'
    },
    purple: {
      100: '#8257e5',
      200: '#6f46ce',
      300: '#6139be',
      500: '#4a21aa',
      600: '#3a1591',
      700: '#2d136b',
      800: '#261255'
    }
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
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
