import { Avatar, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react'

function ProfileTab() {
  return (
    <HStack>
      <Avatar
        size={'lg'}
        name='Dan Abrahmov'
        src='https://bit.ly/dan-abramov'
      />
      <Flex flexWrap={'wrap'} align={'start'} spacing={'2'}>
        <Text
          style={{ fontWeight: '300' }}
          fontSize={'lg'}
          fontWeight={'hairline'}
        >
          User Id
        </Text>
        <Button variant={'outline'} size={'sm'} height={'7'}>
          Follow
        </Button>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          dan name
        </Text>
      </Flex>
    </HStack>
  )
}

export default ProfileTab
