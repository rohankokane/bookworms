// import { lazy, Suspense } from 'react'
import { useAuth } from 'context/authContext'
import AuthenticatedApp from 'AuthenticatedApp'
import UnauthenticatedApp from 'UnauthenticatedApp'

// const AuthenticatedApp = lazy(() =>
//   import(/* webpackPrefetch: true */ './AuthenticatedApp')
// )
// const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'))

function App() {
  const { token } = useAuth()
  return (
    // <Suspense fallback={'Loading...'}>
    !token ? <AuthenticatedApp /> : <UnauthenticatedApp />
    // </Suspense>
  )
}

export default App
