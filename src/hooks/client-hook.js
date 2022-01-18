import { useAuth } from './auth-hook'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from 'store/userSlice'
import { client } from 'utils/client'

function useClient() {
  const { token } = useAuth()
  const dispatch = useDispatch()
  const logoutCb = () => {
    dispatch(logout())
  }
  return useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }, logoutCb),
    [token]
  )
}

export { useClient }
