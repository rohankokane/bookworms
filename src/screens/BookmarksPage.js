import { useEffect } from 'react'
import PostsList from 'components/feed/PostsList'
import { useAuth } from 'hooks/auth-hook'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getBookemarkedByUserId } from 'store/postsSlice'
import LoadingScreen from './LoadingScreen'
import { STATUS_PENDING, STATUS_SUCCESS } from 'utils/constants'
import { Text, VStack } from '@chakra-ui/react'
import { ReactComponent as BookmarksBanner } from '../assets/bookmarks-banner.svg'
import { BsBookmarkStar } from 'react-icons/bs'
import ScreenProvider from 'context/ScreenProvider'

function BookmarksPage() {
  const { status, error, posts } = useSelector((state) => state.posts)
  const { token } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBookemarkedByUserId(token))
  }, [])

  return (
    <ScreenProvider status={status} error={error}>
      <>
        {posts.length === 0 ? (
          <VStack>
            <Text
              color={'gray.600'}
              textAlign={'center'}
              mt={'4'}
              fontSize={'lg'}
              fontWeight='500'
            >
              Coundn't find any posts in your bookmarks.
            </Text>
            <Text mt={'4'} fontSize={'md'} color={'gray.600'}>
              Add to bookmarks by pressing the{' '}
              <BsBookmarkStar style={{ display: 'inline' }} /> button on posts.
            </Text>
            <BookmarksBanner
              style={{
                width: '80%',
                maxWidth: '500px',
                margin: '-4rem auto 0',
              }}
            />
          </VStack>
        ) : (
          <PostsList posts={posts} />
        )}
      </>
    </ScreenProvider>
  )
}

export default BookmarksPage
