function ErrorFallback({ error }) {
  return (
    <div
      role='alert'
      style={{
        color: 'red',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There&apos;s a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default ErrorFallback
