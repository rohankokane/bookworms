import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from 'utils/validators'
import FormInput from 'components/Input'
import { prepareFormData, useForm } from 'hooks/form-hook'
import { useDispatch } from 'react-redux'
import { useClient } from 'hooks/client-hook'
import { Button, Flex, Spacer, useToast, VStack } from '@chakra-ui/react'
import { useAuth } from 'hooks/auth-hook'
import { updateUser } from 'store/userSlice'

function EditProfile({ initialData, onClose }) {
  const { userId, token } = useAuth()
  const dispatch = useDispatch()
  const client = useClient()
  const toast = useToast()
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: initialData.username,
        isValid: true,
      },
      fullname: {
        value: initialData.fullname,
        isValid: true,
      },
      bio: {
        value: initialData.bio,
        isValid: true,
      },
      image: {
        value: initialData?.image,
        isValid: true,
      },
    },
    true
  )

  const handleUpdateProfile = async (data) => {
    const dataToSend = prepareFormData(data)

    // return
    dispatch(updateUser({ userId, token, data: dataToSend }))
      .then((action) => {
        if (!action.error) {
          toast({
            title: 'Profile updated',
            status: 'success',
            position: 'bottom-right',
            duration: 5000,
            isClosable: true,
          })
          onClose()
        } else {
          toast({
            title: 'Error occurred',
            description: `${action?.error?.message} Please try again`,
            status: 'error',
            position: 'bottom-right',
            duration: 5000,
            isClosable: true,
          })
        }
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
  }

  return (
    <VStack w='full'>
      <VStack w={'full'} alignItems='flex-start' spacing={4}>
        <FormInput
          id='fullname'
          type='text'
          onChange={inputHandler}
          placeholder='Full name'
          validators={[VALIDATOR_REQUIRE()]}
          errorMessage='Please enter your full name.'
          initialValue={initialData.fullname}
          initialValid={true}
        />
        <FormInput
          id='username'
          type='text'
          onChange={inputHandler}
          placeholder='Username'
          validators={[VALIDATOR_REQUIRE()]}
          errorMessage='Please enter an username.'
          initialValue={initialData.username}
          initialValid={true}
        />
        <FormInput
          id='image'
          type='text'
          onChange={inputHandler}
          placeholder='Image link'
          initialValue={initialData?.image}
          initialValid={true}
        />
        <FormInput
          id='bio'
          type={'bio'}
          onChange={inputHandler}
          placeholder='Bio'
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorMessage='Please write a bio. Atleast 6 characters long.'
          initialValue={initialData.bio}
          initialValid={true}
        />
      </VStack>
      {/* <Divider /> */}
      <Flex padding='2' w='full' justify='end'>
        <Spacer />
        <Button variant={'ghost'} size='sm' mr='4' onClick={onClose}>
          Cancel
        </Button>
        <Button size='sm' onClick={() => handleUpdateProfile(formState)}>
          Save
        </Button>
      </Flex>
    </VStack>
  )
}

export default EditProfile
