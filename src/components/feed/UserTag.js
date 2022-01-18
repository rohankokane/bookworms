import { Avatar, Button, HStack, Text, VStack } from '@chakra-ui/react'

function UserTag({ profile }) {
  console.log({ profile })
  return (
    <HStack>
      <Avatar
        size={'md'}
        name={profile.fullname}
        src='https://bit.ly/dan-abramov'
      />
      <VStack align={'start'} spacing={'0.5'}>
        <Button
          alignContent={'start'}
          variant={'link'}
          colorScheme={'black'}
          fontSize={'sm'}
        >
          {profile.username}
        </Button>
        <Text paddingLeft={'6px'} fontSize={'sm'}>
          {profile.fullname}
        </Text>
      </VStack>
    </HStack>
  )
}

export default UserTag
