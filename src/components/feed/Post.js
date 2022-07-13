import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

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
import CommentBox from 'components/post/CommentBox'
import { useEffect } from 'react'
import { timeSince } from 'utils/time'

let likeRequestPending = false
let bookmarkRequestPending = false
function Post({ post }) {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [commentBoxFocus, setCommentBoxFocus] = useState(false)
  const { userId, token } = useAuth()
  const client = useClient()
  const navigate = useNavigate()
  const { state, pathname } = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const focusOnComment = state?.focusOnComment ?? false
  useEffect(() => {
    if (!focusOnComment) return

    setCommentBoxFocus(true)
  }, [focusOnComment])

  let isInFeed = !pathname.includes('post')
  let isLiked = post.likes.includes(userId)
  let isBookmarked = post.bookmarks.includes(userId)
  let isUserPost = post.creator?.id === userId || post.creator === userId

  const handleClickLike = () => {
    if (likeRequestPending) return
    dispatch(likePost({ pid: post.id, userId, isLiked, token })).then(() => {
      likeRequestPending = false
    })
    likeRequestPending = true
  }
  const handleClickBookmark = () => {
    if (bookmarkRequestPending) return

    dispatch(bookmarkPost({ pid: post.id, userId, isBookmarked, token })).then(
      () => {
        bookmarkRequestPending = false
      }
    )
    bookmarkRequestPending = true
  }
  const handleOpenPostClick = () => {
    if (isInFeed) {
      navigate(`/post/${post.id}`)
    } else {
      navigate(-1)
    }
  }
  const handleEditMode = () => {
    setEditMode((e) => !e)
  }
  const handleDeletePost = () => {
    if (!isUserPost) return

    dispatch(deletePost(client(`posts/${post.id}`, { method: 'DELETE' })))
      .then(() => {
        navigate(-1)
      })
      .catch((action) => {
        toast({
          title: 'Error occurred',
          description: `${action?.error?.message} Please try again`,
          status: 'error',
          position: 'bottom-right',
          duration: 5000,
          isClosable: true,
        })
      })
  }

  return (
    <Flex
      as={'article'}
      direction={'column'}
      align={'flex-start'}
      justify={'start'}
      w={'full'}
      borderWidth='1px'
      overflow='hidden'
      p={0}
      bg='white'
      marginBottom={4}
    >
      <Flex px='4' py='2' w='full' direction={'horizontal'} align={'baseline'}>
        <Avatar
          size={'sm'}
          name={post.creator.fullname}
          src={post.creator?.image}
        />
        <Link
          to={`/profile/${post.creator.id}`}
          as={RouterLink}
          variant={'brand'}
          mx='2'
        >
          {post.creator.username || post.creator.fullname}
        </Link>

        <Flex fontSize='xs' color={'gray.600'}>
          {timeSince(post.createdAt)}
        </Flex>
        <Spacer />
        {!isInFeed && isUserPost && (
          <IconBtn
            onClick={handleEditMode}
            icon={<FaEdit />}
            marginRight='2'
            aria-label='edit this post'
          />
        )}
        {!isInFeed && isUserPost && (
          <IconBtn
            onClick={onOpen}
            aria-label='delete this post'
            icon={<FaTrash size={'18'} />}
          />
        )}
      </Flex>
      {/* <Divider /> */}

      {editMode ? (
        <EditPostForm
          initialCaption={post.caption}
          onEditMode={handleEditMode}
          postId={post.id}
        />
      ) : (
        <Box as='p' w='full' textAlign={'left'} p={4}>
          {post.caption}
        </Box>
      )}
      {!editMode && (
        <>
          {/* <Divider /> */}

          <Flex
            px='4'
            py='2'
            w='full'
            direction={'horizontal'}
            align={'center'}
            justifyContent='space-between'
            color={'gray.500'}
            fontSize='0.8rem'
            maxW='480px'
            marginX='auto'
          >
            <Flex direction={'horizontal'} align={'center'}>
              <IconBtn
                size='sm'
                highLighted={isLiked}
                onClick={handleClickLike}
                icon={<FaHeart />}
                aria-label='like this post'
                marginRight='1'
              />
              {post.likes.length}
            </Flex>
            <Flex direction={'horizontal'} align={'center'}>
              <IconBtn
                size='sm'
                marginRight='1'
                icon={<FaComment />}
                aria-label='comment on this post'
                onClick={() => {
                  navigate(`/post/${post.id}`, {
                    state: { focusOnComment: true },
                  })
                }}
              />
              {post?.comments?.length || 0}
            </Flex>
            <Flex direction={'horizontal'} align={'center'}>
              <IconBtn
                size='sm'
                marginRight='1'
                highLighted={!isInFeed}
                onClick={() => {
                  handleOpenPostClick()
                }}
                icon={<BsBookFill />}
                aria-label='read this post'
              />
              {post.viewCount || 0}
            </Flex>
            {/* <Spacer /> */}
            <Flex direction={'horizontal'} align={'center'} mr='2'>
              <IconBtn
                size='sm'
                onClick={handleClickBookmark}
                highLighted={isBookmarked}
                icon={<BsBookmarkStarFill />}
                aria-label='bookmark this post'
              />
              {/* {post.bookmarks.length} */}
            </Flex>
          </Flex>
          {!isInFeed && (
            <>
              <Divider />

              <VStack py='2' px='4' w='full'>
                <CommentBox
                  postId={post?.id}
                  comments={post?.comments}
                  focusOnComment={commentBoxFocus}
                />
              </VStack>
            </>
          )}
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={'2'}>
          <ModalHeader>Confirmation</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>Are you sure, you want to delete this post?</ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleDeletePost} colorScheme='red'>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Post
