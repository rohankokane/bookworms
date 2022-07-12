import { Box, Button, Flex, Spacer, VStack } from '@chakra-ui/react'
import FormInput from 'components/Input'
import { useClient } from 'hooks/client-hook'
import { useForm, prepareFormData } from 'hooks/form-hook'
import { useDispatch } from 'react-redux'
import { createPost } from 'store/postsSlice'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from 'utils/validators'

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
    if (!data.isValid) return

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
        isRequired={true}
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage='Post cannot be empty'
      />
      <Flex w='full' justify='end'>
        <Spacer />
        <Button marginTop={'1'} onClick={() => handleCreatePost(formState)}>
          Post
        </Button>
      </Flex>
    </VStack>
  )
}

export default CreatePostForm
