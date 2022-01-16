import { List, ListItem } from '@chakra-ui/react'
import Post from './Post'

function PostsList({ posts }) {
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
