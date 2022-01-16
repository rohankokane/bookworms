import { Button, Flex, VStack } from '@chakra-ui/react'
import FormInput from 'components/Input'
import { useClient } from 'hooks/client-hook'
import { useForm, prepareFormData } from 'hooks/form-hook'
import { useDispatch } from 'react-redux'
import { createPost } from 'store/postsSlice'

function CreatePostForm({ onClose }) {
  const dispatch = useDispatch()

  const client = useClient()
  const [formState, inputHandler] = useForm(
    {
      caption: {
        value: '',
        isValid: false,
      },
    },
    false
  )
  const handleCreatePost = async (data) => {
    const dataToSend = prepareFormData(data)
    dispatch(createPost(client('posts', { data: dataToSend }))).then(() => {
      onClose()
    })
  }

  return (
    <VStack>
      <FormInput
        id='caption'
        placeholder='What are you reading today?'
        onChange={inputHandler}
        type='textarea'
        rows='6'
      />
      <Flex paddingY='2' w='full' justify='end'>
        <Button size='sm' onClick={() => handleCreatePost(formState)}>
          Post
        </Button>
      </Flex>
    </VStack>
  )
}

export default CreatePostForm
