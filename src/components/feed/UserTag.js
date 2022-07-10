import { Avatar, Button, HStack, Text, VStack, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function UserTag({ profile }) {
  return (
    <HStack>
      <Avatar size={'md'} name={profile.fullname} src={profile.image} />
      <VStack align={'start'} spacing={'0.5'}>
        <Link
          variant={'brand'}
          marginLeft='1'
          as={RouterLink}
          to={`/profile/${profile.id}`}
        >
          {profile.username}
        </Link>
        <Text paddingLeft={'6px'} fontSize={'sm'}>
          {profile.fullname}
        </Text>
      </VStack>
    </HStack>
  )
}

export default UserTag
