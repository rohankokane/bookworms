import { useToast } from '@chakra-ui/react'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StartupScreen from 'screens/StartupScreen'
import { loginUser, logOut, notLoggedIn } from 'store/userSlice'
import {
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_SUCCESS,
} from 'utils/constants'

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY
let logoutTimer

function AuthProvider({ children }) {
  const { token, tokenExpirationDate, status } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()
  const toast = useToast()
  const isLoading = status === STATUS_PENDING
  const isIdle = status === null
  const isError = status === STATUS_REJECTED
  const isSuccess = status === STATUS_SUCCESS

  useEffect(() => {
    // on app mount get user data from localStorage to automatically log the user in
    const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        loginUser({
          userId: storedData.userId,
          token: storedData.token,
          tokenExpirationDate: new Date(storedData.expiration),
        })
      ).catch((err) => {
        toast({
          title: 'Error occurred',
          description: `${err.message} Please try again`,
          status: 'error',
          position: 'bottom-right',
          duration: 5000,
          isClosable: true,
        })
      })
    } else {
      dispatch(notLoggedIn())
    }
  }, [])

  useEffect(() => {
    // set timer to automatically logout on token expiry
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime()
      logoutTimer = setTimeout(() => {
        dispatch(logOut()).then(() => {
          toast({
            title: 'Logged out',
            description: `You session has expired, please login again`,
            status: 'info',
            position: 'bottom-right',
            duration: 10000,
            isClosable: true,
          })
        })
      }, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, tokenExpirationDate])

  if (isLoading || isIdle) return <StartupScreen />
  else return children
}

export default AuthProvider
