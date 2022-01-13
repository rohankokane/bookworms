import { useAuth } from 'context/authContext'
import { useCallback } from 'react'
import { client } from 'utils/client'

function useClient() {
  const { token, logout } = useAuth()
  return useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }, logout),
    [token]
  )
}

export { useClient }
