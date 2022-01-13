import { lazy, Suspense } from 'react'
import './App.css'
import { useAuth } from './context/auth-context'
const AuthenticatedApp = lazy(() =>
  import(/* webpackPrefetch: true */ './AuthenticatedApp')
)
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'))

function App() {
  const user = useAuth()
  return (
    <Suspense fallback={'Loading...'}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  )
}

export default App
