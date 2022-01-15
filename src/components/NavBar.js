import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react'
import FormInput from './Input'
import SearchBox from './navBar/SearchBox'
import SiteLogo from './SiteLogo'

function NavBar() {
  const logoDisplay = useBreakpointValue({
    base: 'none',
    sm: 'none',
    md: 'block',
  })
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
          <SiteLogo display={logoDisplay} size='lg' />
          <Spacer />
          <SearchBox />
          <Spacer />
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='my profile'
              icon={
                <Avatar
                  size={'sm'}
                  name='Dan Abrahmov'
                  src='https://bit.ly/dan-abramov'
                />
              }
              variant={'ghost'}
              borderRadius={'full'}
            />
            <MenuList size={'xs'}>
              <MenuItem size={'xs'}>Profile</MenuItem>
              <MenuItem size={'xs'}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Container>
      </Center>
    </nav>
  )
}

export default NavBar
