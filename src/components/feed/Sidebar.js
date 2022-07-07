import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useAsync } from 'hooks/async-hook'
import { useClient } from 'hooks/client-hook'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoadingScreen from 'screens/LoadingScreen'
import { STATUS_PENDING } from 'utils/constants'
import SuggestionList from './SuggestionList'

function Sidebar() {
  // const {
  //   isIdle,
  //   isLoading,
  //   isError,
  //   isSuccess,
  //   setData,
  //   error,
  //   status,
  //   data,
  //   run,
  //   reset,
  // } = useAsync()

  const { status } = useSelector((state) => state.user)
  const { username, fullname, image, suggestions } = useSelector(
    (state) => state.user.user
  )
  // const client = useClient()

  // useEffect(() => {
  //   // run(client('users/new/suggestion'))
  // }, [])

  let isLoading = status === STATUS_PENDING
  if (isLoading) return <LoadingScreen />
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
        <SuggestionList
          style={{ maxWidth: '80%', margin: '0.8rem auto 0' }}
          list={suggestions}
        />
      </VStack>
    </Box>
  )
}

export default Sidebar
