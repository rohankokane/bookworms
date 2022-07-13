import { Center, keyframes } from '@chakra-ui/react'
import { Keyframes } from 'framer-motion'
import SiteLogo from 'components/SiteLogo'
import LoadingScreen from './LoadingScreen'
const scaleUp = keyframes`
from {transform: scale(0.7)}
to {transform: scale(1)}
`

const scaleAnimation = `${scaleUp} 1s cubic-bezier(0.69, 0.1, 0, 0.43)`

const StartupScreen = () => {
  return (
    <Center
      position='fixed'
      flexDirection={'column'}
      align={'center'}
      justifyContent={'space-between'}
      width='100%'
      left='0'
      top='0'
      bottom='0'
      right='0'
      px={[1, 2, 4]}
      zIndex={10}
      bg={'white'}
      paddingBottom={['40', '32']}
    >
      <LoadingScreen marginTop='20' />
      <SiteLogo size='2xl' animation={scaleAnimation} />
    </Center>
  )
}

export default StartupScreen
