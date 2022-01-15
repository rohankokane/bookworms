import { useAsync } from 'hooks/async-hook'
import {
  useState,
  useCallback,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from 'react'
import { client } from 'utils/client'

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY

const AuthContext = createContext()
AuthContext.displayName = 'AuthContext'

let logoutTimer

const bootstrapAppData = async (uid, token) => {
  let user = null

  if (token) {
    // userdata
    const data = await client(`users/${uid}`, { token })
    // fetch posts
    // users
    user = data.user
  }
  return user
}

function AuthProvider({ children }) {
  const [token, setToken] = useState(false)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [userId, setUserId] = useState(false)

  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    reset,
  } = useAsync()

  const login = useCallback((uid, token, expirationDate) => {
    // when login req has been successful -> log user -> store uid,token,expiry in localStorage
    setToken(token)
    setUserId(uid)
    run(bootstrapAppData(uid, token))
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserId(null)
    reset()
    localStorage.removeItem(LOCALSTORAGE_KEY)
  }, [])

  useEffect(() => {
    // set timer to automatically logout
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    // on app mount get user data from localStorage to automatically log the user in
    const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      )
    }
  }, [login])

  const value = useMemo(
    () => ({ user, token, login, logout, userId }),
    [login, logout, token, user, userId]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, AuthContext, useAuth }
