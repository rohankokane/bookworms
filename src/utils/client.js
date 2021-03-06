const apiURL = process.env.REACT_APP_API_URL

async function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {},
  logoutCb
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : null,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // 401 = unauthorized request
        // clear redux store
        logoutCb()
        console.error('401')
        // refresh the page for them
        window.location.assign(window.location)
        return Promise.reject({ message: 'Please re-authenticate.' })
      }

      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        console.log(data)

        throw data?.message
        // return Promise.reject(data)
      }
    })
    .catch((e) => {
      console.log(e)

      throw e
    })
}

export { client }
