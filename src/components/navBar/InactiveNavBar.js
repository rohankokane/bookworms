import { Center, Container, Spacer } from '@chakra-ui/react'
import SiteLogo from 'components/SiteLogo'

const InactiveNavBar = () => {
  return (
    <nav>
      <Center
        position='fixed'
        align={'center'}
        justify={'center'}
        width='100%'
        height={'16'}
        left='0'
        top='0'
        px={[1, 2, 4]}
        py={[1, 1.5, 1.5]}
        zIndex={3}
        bg={'white'}
        shadow={'sm'}
      >
        <Container
          variant={'mainContainer'}
          display={'flex'}
          flexDirection={'horizontal'}
          justifyContent={'center'}
          alignItems={'center'}
          position='fixed'
          width='100%'
          height={'16'}
        >
          {/* {isMobile && !userId && <Spacer />} */}
          {/* <Spacer /> */}
          <SiteLogo size='lg' />
        </Container>
      </Center>
    </nav>
  )
}

export default InactiveNavBar
