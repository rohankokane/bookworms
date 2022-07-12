import { HStack, Input, List, ListItem, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import debounce from 'lodash.debounce'
import { useAsync } from 'hooks/async-hook'
import { useClient } from 'hooks/client-hook'
import { FaUser } from 'react-icons/fa'
import { ReactComponent as SearchBanner } from '../assets/search-people-banner.svg'
import LoadingScreen from './LoadingScreen'
import ProfileCard from 'components/userProfile/ProfileCard'

const SearchPage = () => {
  const { data, error, run, isIdle, isLoading, isSuccess, isError } = useAsync()

  const client = useClient()
  const users = data?.users || []

  useEffect(() => {
    return () => {
      debouncedSearchChange.cancel()
    }
  })

  const handleSearchChange = (e) => {
    const value = e.target.value

    if (!value) return

    run(client(`users?search=${value}`))
    //dispatch query
  }

  const renderInfo = () => {
    if (isIdle) {
      return (
        <VStack>
          <Text
            mt={'4'}
            fontSize={'lg'}
            color={'gray.600'}
            textAlign={'center'}
            fontWeight='500'
          >
            Search more bibliophiles like you with the search bar above.
          </Text>
          <SearchBanner
            style={{
              width: '70%',
              maxWidth: '500px',
              margin: '-4rem auto 0',
            }}
          />
        </VStack>
      )
    } else if (isLoading) {
      return <LoadingScreen />
    } else if (isError) {
      return (
        <>
          <Text
            color={'gray.600'}
            textAlign={'center'}
            fontSize={'lg'}
            fontWeight='500'
            style={{ marginTop: '2rem' }}
          >
            No users found
          </Text>
          <Text color={'gray.600'} fontSize={'md'}>
            We couldn't find anyone for that search.
          </Text>
        </>
      )
    } else {
      return (
        <List w={'full'} spacing={3} overflowY={'auto'}>
          {users.map((profile) => (
            <ListItem key={profile.id}>
              <ProfileCard data={profile} />
            </ListItem>
          ))}
        </List>
      )
    }
  }

  const debouncedSearchChange = debounce(handleSearchChange, 400)
  return (
    <VStack>
      <HStack w='full'>
        <Input
          onChange={debouncedSearchChange}
          size={'md'}
          id='search'
          type='search'
          placeholder='search'
        />
      </HStack>
      <>{renderInfo()}</>
    </VStack>
  )
}

export default SearchPage
