import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    black: '#3D3D3D',
    white: '#fafafa',
    Purple: {
      300: '#9776C8',
      500: '#6c36bc',
      800: '#23123D'
    },
    Yellow: {
      500: '#F0C22E'
    },
    Green: {
      300: '#85DD6F',
      500: '#4cd62b',
      800: '#3BA321'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  }
})
