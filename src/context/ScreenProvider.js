import ErrorScreen from 'screens/ErrorScreen'
import LoadingScreen from 'screens/LoadingScreen'
import { STATUS_PENDING, STATUS_REJECTED } from 'utils/constants'

function ScreenProvider({ status, error, children }) {
  let isLoading = status === STATUS_PENDING || status === null
  let isRejected = status === STATUS_REJECTED

  if (isLoading) return <LoadingScreen />
  else if (isRejected) return <ErrorScreen />
  else return children
}

export default ScreenProvider
