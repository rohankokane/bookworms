import { Image, VStack } from '@chakra-ui/react'
// import banner from './banner.jpg'

function Banner() {
  return (
    <VStack
      display={{ base: 'none', md: 'block' }}
      w='full'
      h='full'
      p={1}
      spacing={10}
      alignItems='flex-start'
    >
      <Image alt='bibliophiles in a group' src='/banner.jpg' loading='lazy' />
    </VStack>
  )
}

export default Banner
