import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import Post from 'components/feed/Post'
import PostsList from 'components/feed/PostsList'
import Sidebar from 'components/feed/Sidebar'

function Feed() {
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
        <PostsList />
      </GridItem>
      <GridItem
        display={sideBarDisplay}
        style={{ position: 'sticky', top: '60px' }}
        colSpan={sideBarColSpan}
      >
        <Sidebar />
      </GridItem>
    </Grid>
  )
}

export default Feed
