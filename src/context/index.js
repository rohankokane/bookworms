// import { Router } from 'react-router-dom'
import { AuthProvider } from 'context/authContext'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'utils/theme'
import { BrowserRouter as Router } from 'react-router-dom'

function AppProviders({ children }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </ChakraProvider>
    </>
  )
}

export { AppProviders }
