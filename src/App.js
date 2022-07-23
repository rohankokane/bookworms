import { lazy, Suspense } from 'react'
import { useAuth } from 'hooks/auth-hook'
import StartupScreen from 'screens/StartupScreen'
const AuthenticatedApp = lazy(() =>
  import(/* webpackPrefetch: true */ './AuthenticatedApp')
)
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'))

function App() {
  const { token } = useAuth()
  return (
    <Suspense fallback={<StartupScreen />}>
      {token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  )
}

export default App
