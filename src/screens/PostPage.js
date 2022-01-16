import { VStack } from '@chakra-ui/react'
import Post from 'components/feed/Post'
import { useAsync } from 'hooks/async-hook'
import { useClient } from 'hooks/client-hook'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function PostPage() {
  // const postId = useParams()
  // const post = useSelector((state) => state.posts)
  // console.log({ post })

  // const client = useClient()

  // const {data: post, isLoading, run } = useAsync()
  // useEffect(()=>{
  //   run(client('posts/${postId}'))
  // })
  return <VStack>{/* <Post post={post} /> */}</VStack>
}

export default PostPage
