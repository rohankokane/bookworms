// import { Router } from 'react-router-dom'
import { AuthProvider } from 'context/authContext'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { theme } from 'utils/theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store'

function AppProviders({ children }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Provider store={store}>
          <Router>
            <AuthProvider>{children}</AuthProvider>
          </Router>
        </Provider>
      </ChakraProvider>
    </>
  )
}

export { AppProviders }
