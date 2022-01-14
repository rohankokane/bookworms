import { Box, Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'

function ProfileStat(props) {
  return (
    <Box w={'full'} maxW={'sm'}>
      <SimpleGrid {...props} w={'full'} columns={3} spacing={3}>
        <VStack spacing={1}>
          <Text fontWeight={'bold'}>12</Text>
          <Text fontSize={'sm'} color={'gray.600'}>
            posts
          </Text>
        </VStack>

        <VStack spacing={1}>
          <Text fontWeight={'bold'}>12</Text>
          <Text fontSize={'sm'} color={'gray.600'}>
            followers
          </Text>
        </VStack>

        <VStack spacing={1}>
          <Text fontWeight={'bold'}>12</Text>
          <Text fontSize={'sm'} color={'gray.600'}>
            folowing
          </Text>
        </VStack>
      </SimpleGrid>
    </Box>
  )
}

export default ProfileStat
