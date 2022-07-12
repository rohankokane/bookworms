import {
  Avatar,
  Button,
  Flex,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useAuth } from 'hooks/auth-hook'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteComment } from 'store/postsSlice'
import { Link as RouterLink } from 'react-router-dom'
import { STATUS_PENDING, STATUS_REJECTED } from 'utils/constants'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { timeSince } from 'utils/time'

const CommentBox = ({ postId, comments = [], focusOnComment = false }) => {
  const [commentToDelete, setCommentToDelete] = useState(null)
  const commentBoxRef = useRef(null)

  const dispatch = useDispatch()
  const toast = useToast()
  const { userId, token } = useAuth()
  const { commentStatus } = useSelector((state) => state.posts)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!focusOnComment) return

    commentBoxRef.current.focus()
  }, [focusOnComment])

  let commentIsLoading = commentStatus === STATUS_PENDING

  const handleAddComment = (e) => {
    e.preventDefault()

    const { value } = e.target.commentField
    if (!value) return

    dispatch(addComment({ data: { text: value }, pid: postId, token }))
      .then((action) => {
        if (action.meta.requestStatus === STATUS_REJECTED) throw action
        else e.target.reset()
      })
      .catch((action) => {
        toast({
          title: 'Error',
          description: `${action?.error?.message}`,
          status: 'error',
          position: 'bottom-right',
          duration: 5000,
          isClosable: true,
        })
      })
  }
  const handleDeleteComment = () => {
    dispatch(deleteComment({ cid: commentToDelete, token }))
      .then((action) => {
        if (action.error) throw action
        toast({
          title: 'Comment deleted',
          status: 'success',
          position: 'bottom-right',
          duration: 3000,
          isClosable: true,
        })
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
      .finally(() => onClose())
  }
  const handleDeleteClick = (cid) => {
    setCommentToDelete(cid)
    onOpen()
  }
  return (
    <VStack width={'100%'}>
      <HStack
        as={'form'}
        onSubmit={handleAddComment}
        w={'full'}
        justifyItems={'flex-start'}
        alignItems={'center'}
      >
        <Input
          id='commentField'
          w={'full'}
          variant={'flushed'}
          placeholder='Add a comment'
          fontSize={'md'}
          _placeholder={{
            fontSize: '0.9rem',
          }}
          ref={commentBoxRef}
        />
        <Button
          aria-label='post comment'
          disabled={commentIsLoading}
          variant={'ghost'}
          size={'md'}
          type='submit'
          w={'4.25rem'}
        >
          {commentIsLoading ? <Spinner /> : 'Post'}
        </Button>
      </HStack>
      <VStack w='full' alignItems={'stretch'}>
        {comments.length &&
          comments[0].id !== undefined &&
          comments.map((comment) => (
            <HStack align={'flex-start'} key={comment.id}>
              <Avatar
                size={'sm'}
                name={comment.user.fullname}
                src={comment.user?.image}
                my='2'
              />
              <VStack py='1' w='full' spacing={'1'} align={'flex-start'}>
                <div>
                  <Link
                    variant={'brand'}
                    as={RouterLink}
                    to={`/profile/${comment.user.id}`}
                    mr='3'
                  >
                    {comment.user.username}
                  </Link>
                  <Text as={'span'} w='full' mt='0' fontSize={'sm'}>
                    {comment.text}
                  </Text>
                </div>
                <div>
                  <Text as={'span'} mr='3' fontSize={'xs'} color={'gray.700'}>
                    {timeSince(comment.createdAt)}
                  </Text>
                  {comment.user.id === userId && (
                    <Button
                      variant={'link'}
                      mr='3'
                      fontWeight={'bold'}
                      fontSize={'xs'}
                      color={'gray.700'}
                      onClick={() => {
                        handleDeleteClick(comment.id)
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </VStack>
            </HStack>
          ))}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>Are you sure, you want to delete this comment?</ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleDeleteComment} colorScheme='red'>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default CommentBox
