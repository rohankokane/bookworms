import { Container, Divider } from '@chakra-ui/react'
import PostsList from 'components/feed/PostsList'
import ProfileTab from 'components/userProfile/ProfileTab'
import useProfile from 'hooks/profile-hook'
import LoadingScreen from './LoadingScreen'
let isLoading = true
function UserProfile() {
  const { profile: profileData, posts } = useProfile()
  //
  isLoading = !profileData?.id.length
  // if (isLoading) return 'loading'

  // let isLoading = status === 'pending'
  if (isLoading) return <LoadingScreen />

  return (
    <div>
      <ProfileTab profileData={profileData} />
      <Divider my={4} mb={6} />
      <Container size={'container.md'}>
        <PostsList posts={posts} />
      </Container>
    </div>
  )
}

export default UserProfile
