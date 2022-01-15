// import { Router } from 'react-router-dom'
import { AuthProvider } from 'context/authContext'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { theme } from 'utils/theme'
import { BrowserRouter as Router } from 'react-router-dom'

function AppProviders({ children }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </ChakraProvider>
    </>
  )
}

export { AppProviders }
