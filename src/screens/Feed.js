import { useEffect } from 'react'
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import PostsList from 'components/feed/PostsList'
import Sidebar from 'components/feed/Sidebar'
import { useAuth } from 'hooks/auth-hook'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getPosts } from 'store/postsSlice'

function Feed() {
  const { status, error, posts } = useSelector((state) => state.posts)
  const { token } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts(token))
  }, [])

  const sideBarDisplay = useBreakpointValue({
    base: 'none',
    sm: 'none',
    md: 'block',
  })
  const sideBarColSpan = useBreakpointValue({ base: 0, sm: 0, md: 1 })
  const feedColSpan = useBreakpointValue({ base: 3, sm: 3, md: 2 })

  return (
    <Grid templateColumns='repeat(3,1fr)' gap={8}>
      <GridItem colSpan={feedColSpan}>
        <PostsList posts={posts} />
      </GridItem>
      <GridItem
        display={sideBarDisplay}
        style={{ position: 'sticky', top: '80px', height: '80vh' }}
        colSpan={sideBarColSpan}
      >
        <Sidebar />
      </GridItem>
    </Grid>
  )
}

export default Feed
