import { Container, Divider } from '@chakra-ui/react'
import PostsList from 'components/feed/PostsList'
import ProfileTab from 'components/userProfile/ProfileTab'
import useProfile from 'hooks/profile-hook'
let isLoading = true
function UserProfile() {
  const { profile: profileData, posts } = useProfile()
  console.log({ profile: profileData, posts })
  isLoading = !profileData?.id.length

  if (isLoading) return 'loading'
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
