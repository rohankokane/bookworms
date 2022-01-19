import { Avatar, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function UserTag({ profile }) {
  return (
    <HStack>
      <Avatar size={'md'} name={profile.fullname} src={profile.image} />
      <VStack align={'start'} spacing={'0.5'}>
        <Button
          alignContent={'start'}
          variant={'link'}
          colorScheme={'black'}
          fontSize={'sm'}
        >
          <Link tabIndex={-1} to={`/profile/${profile.id}`}>
            {profile.username}
          </Link>
        </Button>
        <Text paddingLeft={'6px'} fontSize={'sm'}>
          {profile.fullname}
        </Text>
      </VStack>
    </HStack>
  )
}

export default UserTag
