import { Avatar, Button, HStack, Text, VStack } from '@chakra-ui/react'

function UserTag() {
  return (
    <HStack>
      <Avatar
        size={'md'}
        name='Dan Abrahmov'
        src='https://bit.ly/dan-abramov'
      />
      <VStack align={'start'} spacing={'0.5'}>
        <Button
          alignContent={'start'}
          variant={'link'}
          colorScheme={'black'}
          fontSize={'sm'}
        >
          Dan
        </Button>
        <Text paddingLeft={'6px'} fontSize={'sm'}>
          dan name
        </Text>
      </VStack>
    </HStack>
  )
}

export default UserTag
