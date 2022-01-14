import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import SuggestionList from './SuggestionList'

function Sidebar() {
  return (
    <Box h='80vh' as={'aside'}>
      <VStack>
        <HStack>
          <Avatar
            size={'lg'}
            name='Dan Abrahmov'
            src='https://bit.ly/dan-abramov'
          />
          <VStack spacing={'0.5'}>
            <Text fontSize={'sm'}>Dan</Text>
            <Text fontSize={'sm'}>dan name</Text>
          </VStack>
        </HStack>
        <Divider />
        <Text fontSize='sm' color='gray.600'>
          Suggestions for you
        </Text>
        <SuggestionList />
      </VStack>
    </Box>
  )
}

export default Sidebar
