import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostById } from 'store/postsSlice'
import { useAuth } from 'hooks/auth-hook'
import Post from 'components/feed/Post'
import ScreenProvider from 'context/ScreenProvider'

function PostPage() {
  const { id } = useParams()
  const { token } = useAuth()
  const dispatch = useDispatch()
  const { status, error, posts } = useSelector((state) => state.posts)
  const post = posts[0]

  useEffect(() => {
    dispatch(getPostById({ postId: id, token }))
  }, [])

  return (
    <ScreenProvider status={status} error={error}>
      <Post post={post} />
    </ScreenProvider>
  )
}

export default PostPage
