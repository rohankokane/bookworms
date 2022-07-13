import { Box, Spinner } from '@chakra-ui/react'

const LoadingScreen = ({ ...props }) => {
  return (
    <Box
      style={{
        width: '100%',
        minHeight: '300px',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '5rem',
      }}
      {...props}
    >
      <Spinner
        speed='0.55s'
        emptyColor='gray.200'
        color='brand.500'
        size='xl'
        thickness='5px'
      />
    </Box>
  )
}

export default LoadingScreen
