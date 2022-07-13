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
  Link,
} from '@chakra-ui/react'
import IconBtn from '../IconBtn'
import SiteLogo from '../SiteLogo'
import {
  AiFillHome,
  AiFillPlusCircle,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSearch,
} from 'react-icons/ai'
import { IoLogOut } from 'react-icons/io5'
import CreatePostForm from '../feed/CreatePostForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, logout } from 'store/userSlice'
import { BsBookmarkCheck } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { useAuth } from 'hooks/auth-hook'
const activeNavUnderlineStyle = {
  borderBottom: '3px solid',
  borderColor: 'brand.500',
  fontWeight: '600',
}
function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname.split('/')
  const id = path[path.length - 1]
  const { userId } = useAuth()
  const isUserProfile = id === userId

  const dispatch = useDispatch()
  const { username, fullname, image } = useSelector((state) => state.user.user)
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
      py: '2.5',
      px: '3',
      bgColor: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      w: 'full',
      position: 'fixed',
      bottom: '0',
      left: '0',
      height: '63px',
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
          {/* {isMobile && !userId && <Spacer />} */}
          <SiteLogo size='lg' />
          <Spacer />
          {!isMobile && userId && (
            <Box>
              <Link as={NavLink} tabIndex={-1} to='/'>
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
                aria-label='my profile'
                p={1}
                color={'brand.500'}
                mx={1}
                onClick={() => {
                  navigate(`/profile/${userId}`)
                }}
                icon={<Avatar size={'sm'} name={fullname} src={image} />}
              />
            </Box>
          )}
          {isMobile && userId && (
            <IconBtn
              aria-label='Logout'
              p={1}
              color={'brand.500'}
              onClick={onLogout}
              icon={<AiOutlineLogout />}
            />
          )}
          {isMobile && userId && (
            <Box px={'1'} {...getBoxStyle()}>
              <Link
                variant='noFocus'
                tabIndex={-1}
                as={NavLink}
                to={'/'}
                _activeLink={activeNavUnderlineStyle}
              >
                <IconBtn
                  variant={'noFocus'}
                  aria-label='go to home feed'
                  color={'brand.500'}
                  size='md'
                  fontSize='1.75rem'
                  icon={<AiOutlineHome />}
                />
              </Link>
              <Link
                variant='noFocus'
                tabIndex={-1}
                as={NavLink}
                to={'/search'}
                _activeLink={activeNavUnderlineStyle}
              >
                <IconBtn
                  variant={'noFocus'}
                  aria-label='search users'
                  color={'brand.500'}
                  size='md'
                  fontSize='1.75rem'
                  icon={<AiOutlineSearch />}
                />
              </Link>
              <IconBtn
                aria-label='create post'
                paddingX={'0'}
                color={'brand.500'}
                size='md'
                fontSize='1.75rem'
                onClick={onOpen}
                icon={<AiFillPlusCircle />}
              />
              <Link
                variant='noFocus'
                tabIndex={-1}
                as={NavLink}
                to={'/bookmarks'}
                _activeLink={activeNavUnderlineStyle}
              >
                <IconBtn
                  variant={'noFocus'}
                  aria-label='my bookmarks'
                  color={'brand.500'}
                  size='md'
                  fontSize='1.75rem'
                  icon={<BsBookmarkCheck />}
                />
              </Link>
              <Box {...(isUserProfile && activeNavUnderlineStyle)}>
                <IconBtn
                  variant={'noFocus'}
                  aria-label='my profile'
                  color={'brand.500'}
                  size='md'
                  fontSize='1.75rem'
                  onClick={() => {
                    navigate(`/profile/${userId}`)
                  }}
                  icon={
                    <Avatar
                      size={'sm'}
                      // mx={1}
                      name={fullname}
                      src={image}
                    />
                  }
                />
              </Box>
            </Box>
          )}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mx={'2'}>
              <ModalHeader>Create a new post</ModalHeader>
              <ModalCloseButton />
              <ModalBody padding={'1rem'}>
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
