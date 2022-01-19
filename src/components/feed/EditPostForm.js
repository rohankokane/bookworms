import { Button, Divider, Flex, VStack } from '@chakra-ui/react'
import FormInput from 'components/Input'
import { useClient } from 'hooks/client-hook'
import { useForm, prepareFormData } from 'hooks/form-hook'
import { useDispatch } from 'react-redux'
import { updatePost } from 'store/postsSlice'

function EditPostForm({ initialCaption, postId, onEditMode }) {
  const dispatch = useDispatch()
  const client = useClient()
  const [formState, inputHandler] = useForm(
    {
      caption: {
        value: initialCaption,
        isValid: true,
      },
    },
    true
  )
  const handleUpdatePost = async (data) => {
    const dataToSend = prepareFormData(data)
    dispatch(
      updatePost(
        client(`posts/${postId}`, { method: 'PATCH', data: dataToSend })
      )
    ).then(() => {
      onEditMode()
    })
  }

  return (
    <VStack w='full'>
      <FormInput
        initialValue={initialCaption}
        initialValid={true}
        id='caption'
        placeholder='What are you reading today?'
        onChange={inputHandler}
        type='textarea'
        rows='6'
      />
      {/* <Divider /> */}
      <Flex padding='2' w='full' justify='end'>
        <Button variant={'ghost'} size='sm' mr='4' onClick={onEditMode}>
          Cancel
        </Button>
        <Button size='sm' onClick={() => handleUpdatePost(formState)}>
          Save
        </Button>
      </Flex>
    </VStack>
  )
}

export default EditPostForm
