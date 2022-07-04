import { Spinner } from '@chakra-ui/react'

const LoadingScreen = () => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '5rem',
      }}
    >
      <Spinner
        speed='0.55s'
        emptyColor='gray.200'
        color='brand.500'
        size='xl'
        thickness='5px'
      />
    </div>
  )
}

export default LoadingScreen
