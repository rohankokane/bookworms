import { useEffect } from 'react'
import PostsList from 'components/feed/PostsList'
import { useAuth } from 'hooks/auth-hook'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getPosts } from 'store/postsSlice'
import LoadingScreen from './LoadingScreen'

function Feed() {
  const { status, error, posts } = useSelector((state) => state.posts)
  const { token } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts(token))
  }, [])

  let isLoading = status === 'pending'

  return isLoading ? <LoadingScreen /> : <PostsList posts={posts} />
}

export default Feed
