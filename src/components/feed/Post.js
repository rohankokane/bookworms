import { Avatar, Box, Button, Divider, Flex, Spacer } from '@chakra-ui/react'
import IconBtn from 'components/IconBtn'
import { useAuth } from 'context/authContext'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { FaComment, FaEdit, FaHeart, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bookmarkPost, likePost } from 'store/postsSlice'

let likeRequestPending = false
let bookmarkRequestPending = false
function Post({ post }) {
  const { userId, token } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let isLiked = post.likes.includes(userId)
  let isBookmarked = post.bookmarks.includes(userId)
  let isUserPost = post.creator.id === userId

  const onClickLike = () => {
    console.log(`Clicked like: ${userId}`)
    if (likeRequestPending) {
      console.log('Request already pending! Do nothing.')
      return
    }
    console.log(`Update state: ${userId}`)
    dispatch(likePost({ pid: post.id, userId, isLiked, token })).then(() => {
      likeRequestPending = false
    })
    likeRequestPending = true
  }
  const onClickBookmark = () => {
    console.log(`Clicked isBookmarked: ${userId}`)
    if (bookmarkRequestPending) {
      console.log('Request already pending! Do nothing.')
      return
    }
    console.log(`Update state: ${userId}`)
    dispatch(bookmarkPost({ pid: post.id, userId, isBookmarked, token })).then(
      () => {
        bookmarkRequestPending = false
      }
    )
    bookmarkRequestPending = true
  }
  const onEditPost = () => {
    navigate(`post/${post.id}`)
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
        <Avatar size={'sm'} name={post.creator.username} src='' />
        <Button variant={'link'} color={'gray.800'} mx='2' size={'sm'}>
          {post.creator.username || post.creator.fullname}
        </Button>
        <Spacer />
        {isUserPost && (
          <IconBtn aria-label='delete this post' icon={<FaTrash />} />
        )}
      </Flex>
      <Divider />
      <Box as='p' w='full' textAlign={'left'} p={4}>
        {post.caption}
      </Box>
      <Divider />
      <Flex px='2' py='2' w='full' direction={'horizontal'} align={'center'}>
        <IconBtn
          highLighted={isLiked}
          onClick={onClickLike}
          icon={<FaHeart />}
          aria-label='like this post'
        />
        <IconBtn icon={<FaComment />} aria-label='comment on this post' />
        {isUserPost && (
          <IconBtn
            onClick={onEditPost}
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
    </Flex>
  )
}

export default Post
