// import { Router } from 'react-router-dom'
import { AuthProvider } from 'context/authContext'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'utils/theme'

function AppProviders({ children }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </>
  )
}

export { AppProviders }
