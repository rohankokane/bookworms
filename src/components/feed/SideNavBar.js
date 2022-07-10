import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useAsync } from 'hooks/async-hook'
import { useClient } from 'hooks/client-hook'
import { useEffect } from 'react'
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineUser,
} from 'react-icons/ai'
import {
  BsBookmark,
  BsBookmarkCheck,
  BsFillBookmarkStarFill,
} from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import LoadingScreen from 'screens/LoadingScreen'
import { STATUS_PENDING } from 'utils/constants'
import SuggestionList from './SuggestionList'
const activeStyle = {
  color: 'brand.500',
}
function SideNavBar() {
  // const { status } = useSelector((state) => state.user)
  // const { username, fullname, image, suggestions } = useSelector(
  //   (state) => state.user.user
  // )

  // let isLoading = status === STATUS_PENDING
  // if (isLoading) return <LoadingScreen />
  return (
    <Box as={'aside'}>
      <VStack alignItems={'stretch'}>
        <Link as={NavLink} to={'/'} _activeLink={activeStyle}>
          <Flex as='span' p='1rem' align={'center'} width={'100%'}>
            <Icon as={AiOutlineHome} fontSize={'1.5rem'}></Icon>
            <Text px={4} fontSize={'l'}>
              Home
            </Text>
          </Flex>
        </Link>
        <Link as={NavLink} to={'/search'} _activeLink={activeStyle}>
          <Flex as='span' p='1rem' align={'center'} width={'100%'}>
            <Icon as={AiOutlineSearch} fontSize={'1.5rem'}></Icon>
            <Text px={4} fontSize={'l'}>
              Search
            </Text>
          </Flex>
        </Link>
        <Link as={NavLink} to={'/bookmarks'} _activeLink={activeStyle}>
          <Flex as='span' p='1rem' align={'center'} width={'100%'}>
            <Icon as={BsBookmarkCheck} fontSize={'1.5rem'}></Icon>
            <Text px={4} fontSize={'l'}>
              Bookmarks
            </Text>
          </Flex>
        </Link>
        <Link as={NavLink} to={'/myprofile'} _activeLink={activeStyle}>
          <Flex as='span' p='1rem' align={'center'} width={'100%'}>
            <Icon as={AiOutlineUser} fontSize={'1.5rem'}></Icon>
            <Text px={4} fontSize={'l'}>
              My Profile
            </Text>
          </Flex>
        </Link>
        <Link as={NavLink} to={'/logout'} _activeLink={activeStyle}>
          <Flex as='span' p='1rem' align={'center'} width={'100%'}>
            <Icon as={AiOutlineLogout} fontSize={'1.5rem'}></Icon>
            <Text px={4} fontSize={'l'}>
              Logout
            </Text>
          </Flex>
        </Link>
        <Divider style={{ margin: '1rem 0 0.5rem' }} />
        <Button leftIcon={<AiOutlinePlus />} variant={'solid'}>
          New Post
        </Button>
      </VStack>
    </Box>
  )
}

export default SideNavBar
