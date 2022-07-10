import { Container, Divider } from '@chakra-ui/react'
import PostsList from 'components/feed/PostsList'
import ProfileTab from 'components/userProfile/ProfileTab'
import LoadingScreen from './LoadingScreen'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { currentUserProfile, getProfileData } from 'store/userSlice'
import { getPostsByUserId } from 'store/postsSlice'
import { useAuth } from 'hooks/auth-hook'
import { STATUS_PENDING, STATUS_SUCCESS } from 'utils/constants'

function UserProfile() {
  // const { profile: currentProfile, posts } = useProfile()
  const { userId, token } = useAuth()
  const { currentProfile } = useSelector((state) => state.user)
  const { posts, status: postsStatus } = useSelector((state) => state.posts)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userId === id) dispatch(currentUserProfile())
    else {
      dispatch(getProfileData({ userId: id, token }))
    }
    dispatch(getPostsByUserId({ userId: id, token }))
  }, [id])

  let isLoading =
    !currentProfile.status || currentProfile.status !== STATUS_SUCCESS
  let isLoadingPosts = postsStatus === STATUS_PENDING
  if (isLoading) return <LoadingScreen />
  // console.log(currentProfile)
  return (
    <div>
      <ProfileTab profileData={currentProfile} postsCount={posts.length || 0} />
      <Divider my={4} mb={6} />
      <Container size={'container.md'} paddingX='0'>
        {isLoadingPosts ? <LoadingScreen /> : <PostsList posts={posts} />}
      </Container>
    </div>
  )
}

export default UserProfile
