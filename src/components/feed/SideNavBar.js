import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Link,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useAuth } from 'hooks/auth-hook'
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
import CreatePostForm from './CreatePostForm'
const activeStyle = {
  color: 'brand.500',
  fontWeight: '600',
}
function SideNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { token, userId } = useAuth()

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
        <Link as={NavLink} to={`/profile/${userId}`} _activeLink={activeStyle}>
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
        <Button
          onClick={onOpen}
          aria-label='Create new post'
          leftIcon={<AiOutlinePlus />}
          variant={'solid'}
        >
          New Post
        </Button>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={'2'}>
          <ModalHeader>Create new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={'1rem'}>
            <CreatePostForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default SideNavBar
