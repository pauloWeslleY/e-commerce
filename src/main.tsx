import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { AppRoutes } from './routes/App.routes.tsx'
import { theme } from './themes/themes.ts'
import './services/firebase'
import './styles/global.css'

const elementRoot = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(elementRoot).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={AppRoutes} />
    </ChakraProvider>
  </React.StrictMode>
)
