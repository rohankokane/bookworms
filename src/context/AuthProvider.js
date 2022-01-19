import { useToast } from '@chakra-ui/react'
import { useAuth } from 'hooks/auth-hook'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, logout } from 'store/userSlice'

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY
let logoutTimer

function AuthProvider({ children }) {
  const { token, tokenExpirationDate } = useAuth()
  const dispatch = useDispatch()
  const toast = useToast()
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
    }
  }, [])

  useEffect(() => {
    // set timer to automatically logout on token expiry
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime()
      logoutTimer = setTimeout(() => {
        dispatch(logout()).then(() => {
          toast({
            title: 'Logged out',
            description: `Please kindly re-login`,
            status: 'info',
            position: 'bottom-right',
            duration: null,
            isClosable: true,
          })
        })
      }, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, tokenExpirationDate])

  return children
}

export default AuthProvider
