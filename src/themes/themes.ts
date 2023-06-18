import { ThemeConfig, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

//* Configuration Dark Mode on App
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('whiteAlpha.800', 'blackAlpha.800')(props),
        color: mode('blackAlpha.900', 'whiteAlpha.900')(props),
        fontFamily: "'Poppins', sans-serif",
      },
    }),
  },
  fonts: {
    Poppins: `'Poppins', sans-serif`,
    Inter: `'Inter', sans-serif`,
  },
  colors: {
    gray: {
      900: '#121212',
      800: '#111111',
      700: '#131316',
      600: '#141517',
      500: '#1c1c21',
      400: '#26262c',
      300: '#2f3037',
      200: '#393a41',
      100: '#4b4c52',
      50: '#5b5c62',
    },
    purple: {
      800: '#7743DB',
      700: '#553C9A',
      600: '#6A64D9',
      500: '#A084DC',
      400: '#ADA2FF',
      200: '#BFACE2',
    },
    emerald: {
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    },
    blue: {
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
    },
  },
})
