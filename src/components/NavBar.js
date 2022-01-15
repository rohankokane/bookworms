import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Spacer,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useAuth } from 'context/authContext'
import IconBtn from './IconBtn'
import FormInput from './Input'
import SearchBox from './navBar/SearchBox'
import SiteLogo from './SiteLogo'
import { AiFillHome, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { IoLogOut } from 'react-icons/io5'
import CreatePost from './feed/CreatePost'
import CreatePostForm from './feed/CreatePostForm'
import { useAsync } from 'hooks/async-hook'
import { Link, useNavigate } from 'react-router-dom'
function NavBar() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  // const {isLoading, isSuccess} = useAsync();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const logoDisplay = useBreakpointValue({
    base: 'none',
    sm: 'none',
    md: 'block',
  })
  const handleCreatePost = (data) => {}
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
          <Link tabIndex={-1} to='/'>
            <IconBtn
              // as={}
              aria-label='go to home feed'
              p={1}
              color={'brand.500'}
              mx={1}
              icon={<AiFillHome />}
            />
          </Link>
          <IconBtn
            aria-label='create post'
            p={1}
            color={'brand.500'}
            mx={1}
            onClick={onOpen}
            icon={<AiFillPlusCircle />}
          />
          <IconBtn
            aria-label='Logout'
            p={1}
            color={'brand.500'}
            mx={1}
            onClick={logout}
            icon={<IoLogOut />}
          />
          <IconBtn
            aria-label='Logout'
            p={1}
            color={'brand.500'}
            mx={1}
            onClick={() => {
              navigate('/profile/me')
            }}
            icon={
              <Avatar
                size={'sm'}
                // mx={1}
                // maxH={'1.75rem'}
                // maxW={'1.75rem'}
                name='Dan Abrahmov'
                src='https://bit.ly/dan-abramov'
              />
            }
          />

          {/* <CreatePost isOpen={isOpen} onClose={onClose} /> */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create new post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CreatePostForm onSubmit={handleCreatePost} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Center>
    </nav>
  )
}

export default NavBar
