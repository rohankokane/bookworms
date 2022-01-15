import { Box, Container } from '@chakra-ui/react'
import ErrorFallback from 'components/ErrorFallback'
import NavBar from 'components/NavBar'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import Feed from 'screens/Feed'
import UserProfile from 'screens/UserProfile'

function AuthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NavBar />
      <Box bg={'#fafafa'} w={'full'} minH={'100vh'}>
        <Container variant={'mainContainer'} py={'4'} mt={'16'} as='main'>
          <AppRoutes />
        </Container>
      </Box>
    </ErrorBoundary>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route exact path='/' element={<Feed />} />
      <Route path='/profile/me' element={<UserProfile />} />
      <Route path='/profile/:id' element={<UserProfile />} />
      {/* <Route path="*" element={<NotFoundScreen />} /> */}
    </Routes>
  )
}

export default AuthenticatedApp
