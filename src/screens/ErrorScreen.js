import { WarningTwoIcon } from '@chakra-ui/icons'
import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { ReactComponent as ErrorBanner } from '../assets/error-read-book.svg'

const ErrorScreen = ({ ...props }) => {
  return (
    <Flex
      style={{
        width: '100%',
        minHeight: '300px',
        overflowY: 'hidden',
        maxHeight: '100vh',
        // paddingTop: '3rem',
      }}
      pt='2'
      direction={'column'}
      overflow='hidden'
      {...props}
    >
      <VStack
        as={'div'}
        justifyItems='flex-start'
        alignItems={'start'}
        spacing='4'
        w={'full'}
        overflow='hidden'
        px={'8'}
        zIndex='1'
        // bg='red.50'
      >
        <WarningTwoIcon
          boxSize={'2rem'}
          color={'red.500'}
          marginX='auto'
          // style={{ fontSize: '2rem', display: 'inline', marginRight: '0.5rem' }}
        />
        <Text
          as={'h2'}
          textAlign={'center'}
          w='full'
          fontSize={'lg'}
          fontWeight={'500'}
          color={'red.500'}
        >
          Something went wrong
        </Text>
        <Text fontWeight={'500'} color={'gray.600'}>
          Unfortunately, a server error has prevented your request from being
          completed. Please check your internet connection and try again.
        </Text>
        <Text color={'gray.600'}>
          If this still persists, read a book, come back later, while we get it
          fixed.
        </Text>
      </VStack>
      <Box
        style={{
          zIndex: '0',
          margin: '-45% auto 0',
          maxWidth: '80%',
          height: '80vh',
          maxHeight: '650px',
          overflow: 'hidden',
        }}
      >
        <ErrorBanner
          style={{
            zIndex: '0',
            // margin: '-50% auto 0',
            maxWidth: '100%',
            // height: '80vh',
            maxHeight: '600px',
          }}
        />
      </Box>
    </Flex>
  )
}

export default ErrorScreen
