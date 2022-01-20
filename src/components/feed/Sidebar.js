import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useAsync } from 'hooks/async-hook'
import { useClient } from 'hooks/client-hook'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SuggestionList from './SuggestionList'

function Sidebar() {
  const {
    isIdle,
    isLoading,
    isError,
    isSuccess,
    setData,
    error,
    status,
    data,
    run,
    reset,
  } = useAsync()
  const { username, fullname, image } = useSelector((state) => state.user.user)
  const client = useClient()
  useEffect(() => {
    run(client('users/new/suggestion'))
  }, [])
  return (
    <Box as={'aside'}>
      <VStack>
        <HStack>
          <Avatar size={'lg'} name={fullname} src={image} />
          <VStack spacing={'0.5'}>
            <Text fontSize={'sm'}>{username}</Text>
            <Text fontSize={'sm'}>{fullname}</Text>
          </VStack>
        </HStack>
        <Divider style={{ margin: '1rem 0 0.5rem' }} />
        <Text textAlign={'center'} fontSize='sm' color='gray.600'>
          New members
        </Text>
        {isLoading ? (
          'Loading...'
        ) : (
          <SuggestionList
            style={{ maxWidth: '80%', margin: '0.8rem auto 0' }}
            list={data?.users}
          />
        )}
      </VStack>
    </Box>
  )
}

export default Sidebar
