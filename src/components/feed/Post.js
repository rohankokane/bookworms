import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import IconBtn from 'components/IconBtn'
import { useAuth } from 'hooks/auth-hook'
import { useClient } from 'hooks/client-hook'
import { BsBookFill, BsBookmarkStarFill } from 'react-icons/bs'
import { FaComment, FaEdit, FaHeart, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { bookmarkPost, deletePost, likePost } from 'store/postsSlice'
import EditPostForm from './EditPostForm'

const COMMENTS = [
  {
    id: '1234',
    username: 'rohan',
    comment: 'hey first comment',
  },
  {
    id: '1235',
    username: 'rock',
    comment: 'hey new comment',
  },
]

let likeRequestPending = false
let bookmarkRequestPending = false
function Post({ post }) {
  const [editMode, setEditMode] = useState(false)
  const { userId, token } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const client = useClient()
  const { isOpen, onOpen, onClose } = useDisclosure()
  let isInFeed = !location.pathname.includes('post')
  let isLiked = post.likes.includes(userId)
  let isBookmarked = post.bookmarks.includes(userId)
  let isUserPost = post.creator?.id === userId || post.creator === userId

  const onClickLike = () => {
    if (likeRequestPending) {
      return
    }

    dispatch(likePost({ pid: post.id, userId, isLiked, token })).then(() => {
      likeRequestPending = false
    })
    likeRequestPending = true
  }
  const onClickBookmark = () => {
    if (bookmarkRequestPending) {
      return
    }

    dispatch(bookmarkPost({ pid: post.id, userId, isBookmarked, token })).then(
      () => {
        bookmarkRequestPending = false
      }
    )
    bookmarkRequestPending = true
  }
  const onOpenPostClick = () => {
    if (isInFeed) {
      navigate(`/post/${post.id}`)
    } else {
      navigate(-1)
    }
  }
  const onEditMode = () => {
    setEditMode((e) => !e)
  }
  const onDeletePost = () => {
    if (!isUserPost) return
    // const dataToSend = prepareFormData(data)
    //
    dispatch(deletePost(client(`posts/${post.id}`, { method: 'DELETE' }))).then(
      () => {
        navigate(-1)
      }
    )
  }

  return (
    <Flex
      as={'article'}
      direction={'column'}
      align={'center'}
      justify={'start'}
      w={'full'}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      p={0}
      bg='white'
      my={4}
    >
      <Flex px='2' py='2' w='full' direction={'horizontal'} align={'center'}>
        <Avatar
          size={'sm'}
          name={post.creator.username}
          src={post.creator?.image}
        />
        <Button
          onClick={() => {
            navigate(`/profile/${post.creator.id}`)
          }}
          variant={'link'}
          color={'gray.800'}
          mx='2'
          size={'sm'}
        >
          {post.creator.username || post.creator.fullname}
        </Button>
        <Spacer />
        {!isInFeed && isUserPost && (
          <IconBtn
            onClick={onOpen}
            aria-label='delete this post'
            icon={<FaTrash />}
          />
        )}
      </Flex>
      <Divider />
      {editMode ? (
        <EditPostForm
          initialCaption={post.caption}
          onEditMode={onEditMode}
          postId={post.id}
        />
      ) : (
        <Box as='p' w='full' textAlign={'left'} p={4}>
          {post.caption}
        </Box>
      )}
      {!editMode && (
        <>
          <Divider />
          <Flex
            px='2'
            py='2'
            w='full'
            direction={'horizontal'}
            align={'center'}
          >
            <IconBtn
              highLighted={isLiked}
              onClick={onClickLike}
              icon={<FaHeart />}
              aria-label='like this post'
            />
            <IconBtn icon={<FaComment />} aria-label='comment on this post' />
            <IconBtn
              highLighted={!isInFeed}
              onClick={() => {
                onOpenPostClick()
              }}
              icon={<BsBookFill />}
              aria-label='read this post'
            />
            {!isInFeed && isUserPost && (
              <IconBtn
                onClick={onEditMode}
                icon={<FaEdit />}
                aria-label='edit this post'
              />
            )}
            <Spacer />
            <IconBtn
              onClick={onClickBookmark}
              highLighted={isBookmarked}
              icon={<BsBookmarkStarFill />}
              aria-label='bookmark this post'
            />
          </Flex>
        </>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>Are you sure, you want to delete this post?</ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onDeletePost} colorScheme='red'>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Post
