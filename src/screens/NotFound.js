import { Text, VStack } from '@chakra-ui/react'
import { ReactComponent as SearchBanner } from '../assets/page-not-found.svg'

const NotFound = () => {
  return (
    <VStack w='full'>
      <>
        <Text
          color={'gray.600'}
          textAlign={'center'}
          mt={'4'}
          fontSize={'lg'}
          fontWeight='500'
        >
          Sorry, this page isn't available.
        </Text>
        <Text textAlign={'center'} color={'gray.600'} fontSize={'md'}>
          The link you followed may be broken, or the page may have been
          removed. Go back to Bookworms.
        </Text>
      </>

      <SearchBanner
        style={{ display: 'block', width: '70%', margin: '-6rem auto 0' }}
      />
    </VStack>
  )
}

export default NotFound
