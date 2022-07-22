import { VStack } from '@chakra-ui/react'
import { ReactComponent as BannerImg } from '../../assets/bibliophile.svg'
// import banner from './banner.jpg'

function Banner() {
  return (
    <VStack
      display={{ base: 'none', md: 'block' }}
      w='full'
      h='full'
      p={1}
      spacing={10}
      alignItems='center'
      justifyContent={'center'}
    >
      <BannerImg
        style={{ margin: '0 auto 0', width: '80%', maxWidth: '600px' }}
      />
    </VStack>
  )
}

export default Banner
