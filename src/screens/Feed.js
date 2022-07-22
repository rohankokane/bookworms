import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useAuth } from 'hooks/auth-hook'
import { getPosts } from 'store/postsSlice'
import ScreenProvider from 'context/ScreenProvider'
import PostsList from 'components/feed/PostsList'

function Feed() {
  const { status, error, posts } = useSelector((state) => state.posts)
  const { token } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts(token))
  }, [])

  return (
    <ScreenProvider status={status} error={error}>
      <PostsList posts={posts} />
    </ScreenProvider>
  )
}

export default Feed
