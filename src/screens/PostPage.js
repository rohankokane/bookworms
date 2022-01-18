import { VStack } from '@chakra-ui/react'
import Post from 'components/feed/Post'
import { useAuth } from 'hooks/auth-hook'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostById } from 'store/postsSlice'

function PostPage() {
  const { id } = useParams()
  const { token } = useAuth()
  const dispatch = useDispatch()
  const { status, error, posts } = useSelector((state) => state.posts)
  const post = posts[0]
  let isLoading = status === 'pending'
  let isIdle = status === null

  useEffect(() => {
    dispatch(getPostById({ postId: id, token }))
  }, [])

  return (
    <VStack margin='0 auto' maxW={{ base: 'full', md: 'xl' }}>
      {!post?.caption ? 'Loading...' : <Post post={post} />}
    </VStack>
  )
}

export default PostPage
