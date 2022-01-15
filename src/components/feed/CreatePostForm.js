import { Button, Flex, VStack } from '@chakra-ui/react'
import FormInput from 'components/Input'
import { useForm } from 'hooks/form-hook'

function CreatePostForm({ onSubmit }) {
  const [formState, inputHandler] = useForm(
    {
      caption: {
        value: '',
        isValid: false,
      },
    },
    false
  )
  return (
    <VStack>
      <FormInput
        id='caption'
        placeholder='What are you reading today?'
        onChange={inputHandler}
        type='textarea'
        rows='7'
      />
      <Flex paddingY='2' w='full' justify='end'>
        <Button onClick={() => onSubmit(formState)}>Post</Button>
      </Flex>
    </VStack>
  )
}

export default CreatePostForm
