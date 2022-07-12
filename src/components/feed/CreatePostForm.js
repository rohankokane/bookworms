import { Button, Flex, VStack } from '@chakra-ui/react'
import FormInput from 'components/Input'
import { useClient } from 'hooks/client-hook'
import { useForm, prepareFormData } from 'hooks/form-hook'
import { useDispatch } from 'react-redux'
import { createPost } from 'store/postsSlice'
import { VALIDATOR_MINLENGTH } from 'utils/validators'

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
    // console.log(data)
    const dataToSend = prepareFormData(data)
    // console.log(dataToSend)
    dispatch(
      createPost(client('posts', { data: dataToSend, method: 'POST' }))
    ).then(() => {
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
        rows='8'
        validators={[VALIDATOR_MINLENGTH(6)]}
      />
      <Flex paddingY='2' w='full' justify='end'>
        <Button size='md' onClick={() => handleCreatePost(formState)}>
          Post
        </Button>
      </Flex>
    </VStack>
  )
}

export default CreatePostForm
