import { Center, List, ListItem } from '@chakra-ui/react'
import Post from './Post'

function PostsList({ posts }) {
  if (!posts.length) return <Center>'No posts'</Center>

  return (
    <>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <Post post={post} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default PostsList
