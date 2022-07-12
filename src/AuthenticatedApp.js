import {
  Box,
  Container,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react'
import ErrorFallback from 'components/ErrorFallback'
import NavBar from 'components/navBar/NavBar'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import Feed from 'screens/Feed'
import PostPage from 'screens/PostPage'
import UserProfile from 'screens/UserProfile'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import SideNavBar from 'components/feed/SideNavBar'
import Sidebar from 'components/feed/Sidebar'
import BookmarksPage from 'screens/BookmarksPage'
import LogOut from 'screens/LogOut'
import SearchPage from 'screens/SearchPage'
import NotFound from 'screens/NotFound'

function AuthenticatedApp() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const sideBarDisplay = useBreakpointValue({
    base: 'none',
    sm: 'none',
    md: 'block',
  })
  const sideBarColSpan = useBreakpointValue({ base: 0, sm: 0, md: 1 })
  const feedColSpan = useBreakpointValue({ base: 4, sm: 4, md: 2 })

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NavBar />
      <Box bg={'#fafafa'} w={'full'} minH={'70vh'}>
        <Container
          as='main'
          variant={'mainContainer'}
          px='0'
          py={'4'}
          mt={'16'}
        >
          <Grid templateColumns='repeat(4,1fr)' gap={8}>
            <GridItem
              display={sideBarDisplay}
              style={{ position: 'sticky', top: '80px', height: '80vh' }}
              colSpan={sideBarColSpan}
            >
              <SideNavBar />
            </GridItem>
            <GridItem colSpan={feedColSpan} marginBottom={'16'}>
              <AppRoutes />
            </GridItem>
            <GridItem
              display={sideBarDisplay}
              style={{ position: 'sticky', top: '80px', height: '80vh' }}
              colSpan={sideBarColSpan}
            >
              <Sidebar />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </ErrorBoundary>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route exact path='/' element={<Feed />} />
      <Route exact path='/bookmarks' element={<BookmarksPage />} />
      <Route exact path='/search' element={<SearchPage />} />
      <Route exact path='/post/:id' element={<PostPage />} />
      <Route exact path='/post/edit/:id' element={<PostPage />} />
      <Route path='/profile/:id' element={<UserProfile />} />
      <Route path='/logout' element={<LogOut />} />
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  )
}

export default AuthenticatedApp
