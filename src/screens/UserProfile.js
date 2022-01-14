import { Container, Divider } from '@chakra-ui/react'
import PostsList from 'components/feed/PostsList'
import ProfileTab from 'components/userProfile/ProfileTab'
import { useParams } from 'react-router-dom'
import Feed from './Feed'

function UserProfile() {
  // const { id } = useParams()
  return (
    <div>
      <ProfileTab />
      <Divider my={4} mb={6} />
      <Container size={'container.md'}>
        <PostsList />
      </Container>
    </div>
  )
}

export default UserProfile
