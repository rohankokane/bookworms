import {
  Button,
  Divider,
  Heading,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import SiteLogo from '../SiteLogo'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from 'utils/validators'
import FormInput from 'components/Input'
import { prepareFormData, useForm } from 'hooks/form-hook'
import { useDispatch } from 'react-redux'
import { STATUS_PENDING } from 'utils/constants'
import { signupUser } from 'store/userSlice'

let status = ''
function SignUpForm({ setLoginMode }) {
  const toast = useToast()
  const dispatch = useDispatch()
  const isLoading = status === STATUS_PENDING

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      username: {
        value: '',
        isValid: false,
      },
      fullname: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      bio: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const handleSignUp = async () => {
    const signupData = prepareFormData(formState)
    dispatch(signupUser(signupData)).catch((err) => {
      console.log(err)
      toast({
        title: 'Error occurred',
        description: `${err.message} Please try again`,
        status: 'error',
        position: 'bottom-right',
        duration: 5000,
        isClosable: true,
      })
    })
  }

  return (
    <VStack w='full' h='full' p={10} spacing={6} alignItems='center'>
      <SiteLogo />
      <Heading size={'sm'} color={'gray'}>
        Sign up to join the community of bookworms.
      </Heading>
      <VStack w={'full'} alignItems='flex-start' spacing={8}>
        <VStack w={'full'} alignItems='flex-start' spacing={4}>
          <FormInput
            id='fullname'
            type='text'
            onChange={inputHandler}
            placeholder='Full name'
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage='Please enter your full name.'
          />
          <FormInput
            id='username'
            type='text'
            onChange={inputHandler}
            placeholder='Username'
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage='Please enter an username.'
          />
          <FormInput
            id='email'
            type='email'
            onChange={inputHandler}
            placeholder='Email'
            validators={[VALIDATOR_EMAIL()]}
            errorMessage='Please enter a valid email address.'
          />
          <FormInput
            id='password'
            type={'password'}
            onChange={inputHandler}
            placeholder='Password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorMessage='Please enter a valid password, at least 6 characters.'
          />
          <FormInput
            id='bio'
            type={'bio'}
            onChange={inputHandler}
            placeholder='Bio'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorMessage='Please write a short bio.'
          />
        </VStack>

        <VStack w={'full'} alignItems='flex-start' spacing={4}>
          <Button
            aria-label='login'
            disabled={!formState.isValid || isLoading}
            w='full'
            variant={'solid'}
            onClick={handleSignUp}
          >
            Sign up
            {isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null}
          </Button>
        </VStack>

        <VStack w='full' alignItems='flex-start' spacing={4}>
          <Divider my={4} />
        </VStack>
        <Text w={'full'} align={'center'}>
          Already have an account?{' '}
          <Button
            onClick={() => setLoginMode(true)}
            aria-label='open sign up form'
            variant={'link'}
          >
            login.
          </Button>
        </Text>
      </VStack>
    </VStack>
  )
}

export default SignUpForm
