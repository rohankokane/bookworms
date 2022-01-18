import { useSelector } from 'react-redux'

export function useAuth() {
  const { userId, token, tokenExpirationDate } = useSelector(
    (state) => state.user
  )

  return { userId, token, tokenExpirationDate }
}
