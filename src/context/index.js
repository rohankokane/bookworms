import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { theme } from 'utils/theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store'
import AuthProvider from './AuthProvider'
import { Global, css } from '@emotion/react'

function AppProviders({ children }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Global
          styles={css`
            body {
              margin: 0;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              overflow-y: scroll;
            }

            input,
            textarea,
            button,
            select,
            a {
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }
          `}
        />
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
