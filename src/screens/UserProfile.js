import { Box, Container, Divider } from '@chakra-ui/react'
import PostsList from 'components/feed/PostsList'
import ProfileTab from 'components/userProfile/ProfileTab'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { currentUserProfile, getProfileData } from 'store/userSlice'
import { getPostsByUserId } from 'store/postsSlice'
import { useAuth } from 'hooks/auth-hook'
import ScreenProvider from 'context/ScreenProvider'

function UserProfile() {
  const { userId, token } = useAuth()
  const { currentProfile } = useSelector((state) => state.user)
  const {
    posts,
    status: postsStatus,
    error: postsError,
  } = useSelector((state) => state.posts)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userId === id) dispatch(currentUserProfile())
    else {
      dispatch(getProfileData({ userId: id, token }))
    }
    dispatch(getPostsByUserId({ userId: id, token }))
  }, [id])

  return (
    <Box>
      <ScreenProvider status={currentProfile.status} error={postsError}>
        <ProfileTab
          profileData={currentProfile}
          postsCount={posts.length || 0}
        />
        <Divider my={4} mb={6} />
        <ScreenProvider status={postsStatus} error={postsError}>
          <Container size={'container.md'} paddingX='0'>
            <PostsList posts={posts} />
          </Container>
        </ScreenProvider>
      </ScreenProvider>
    </Box>
  )
}

export default UserProfile
