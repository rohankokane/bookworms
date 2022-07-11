import {
  Avatar,
  Center,
  Container,
  Spacer,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  useMediaQuery,
} from '@chakra-ui/react'
import IconBtn from '../IconBtn'
import SearchBox from './SearchBox'
import SiteLogo from '../SiteLogo'
import { AiFillHome, AiFillPlusCircle } from 'react-icons/ai'
import { IoLogOut } from 'react-icons/io5'
import CreatePostForm from '../feed/CreatePostForm'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, logout } from 'store/userSlice'

function NavBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { username, fullname, image, userId } = useSelector(
    (state) => state.user.user
  )
  const onLogout = () => {
    dispatch(logOut())
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const logoDisplay = useBreakpointValue({
    base: 'none',
    sm: 'none',
    md: 'block',
  })
  const [isMobile] = useMediaQuery('(max-width: 700px)')
  const getBoxStyle = () => {
    if (!isMobile) return
    return {
      py: '3',
      px: '2',
      bgColor: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      w: 'full',
      position: 'fixed',
      bottom: '0',
      left: '0',
    }
  }

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
          <Box {...getBoxStyle()}>
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
              onClick={onLogout}
              icon={<IoLogOut />}
            />
            <IconBtn
              aria-label='Logout'
              p={1}
              color={'brand.500'}
              mx={1}
              onClick={() => {
                navigate(`/profile/${userId}`)
              }}
              icon={
                <Avatar
                  size={'sm'}
                  // mx={1}
                  // maxH={'1.75rem'}
                  // maxW={'1.75rem'}
                  name={fullname}
                  src={image}
                />
              }
            />
          </Box>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create new post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CreatePostForm onClose={onClose} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Center>
    </nav>
  )
}

export default NavBar
