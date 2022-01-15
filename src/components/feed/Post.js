import { Avatar, Box, Button, Divider, Flex, Spacer } from '@chakra-ui/react'
import IconBtn from 'components/IconBtn'
import { FaComment, FaEdit, FaHeart, FaTrash } from 'react-icons/fa'

function Post() {
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
          name='Dan Abrahmov'
          src='https://bit.ly/dan-abramov'
        />
        <Button variant={'link'} color={'gray.800'} mx='2' size={'sm'}>
          Dan Abramov
        </Button>
        <Spacer />
        <IconBtn icon={<FaTrash />} />
      </Flex>
      <Divider />
      <Box as='p' w='full' textAlign={'left'} p={4}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corporis
        laudantium quisquam vitae expedita mollitia, magnam consectetur placeat
        vel excepturi.
      </Box>
      <Divider />
      <Flex px='2' py='2' w='full' direction={'horizontal'} align={'center'}>
        <IconBtn icon={<FaHeart />} aria-label='like this post' />
        <IconBtn icon={<FaComment />} aria-label='comment on this post' />
        <IconBtn icon={<FaEdit />} aria-label='edit this post' />

        <Spacer />
      </Flex>
    </Flex>
  )
}

export default Post
