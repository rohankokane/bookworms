const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY

export const saveAuth = (uid, token, tokenExpirationDate) => {
  // when login req has been successful -> store uid,token,expiry in localStorage
  localStorage.setItem(
    LOCALSTORAGE_KEY,
    JSON.stringify({
      userId: uid,
      token: token,
      expiration: tokenExpirationDate.toISOString(),
    })
  )
}

export const removeAuth = () => {
  localStorage.removeItem(LOCALSTORAGE_KEY)
}
