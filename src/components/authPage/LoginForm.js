import {
  Button,
  Divider,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import SiteLogo from '../SiteLogo'
import { useForm } from 'hooks/form-hook'
import FormInput from '../Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from 'utils/validators'
import { useAuth } from 'context/authContext'
import { useClient } from 'hooks/client-hook'
import { useAsync } from 'hooks/async-hook'

function LoginForm({ setLoginMode }) {
  const auth = useAuth()
  const client = useClient()
  const toast = useToast()
  const { isIdle, isLoading, isError, isSuccess, error, data, run, reset } =
    useAsync()

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  )
  const handleLogin = async () => {
    const loginFormData = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    }

    console.log('login in')
    run(
      client('users/login', {
        data: loginFormData,
        method: 'POST',
      })
    )
      .then((resData) => {
        auth.login(resData.userId, resData.token)
      })
      .catch((err) => {
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

  // const {isLoading, isError, error, run} = useAsync()

  return (
    <VStack w='full' h='full' p={10} spacing={6} alignItems='center'>
      {/* <Box w='full' h='full' px={[0, 4, 6]} py={8} paddingTop={10}> */}
      <SiteLogo />
      <VStack w={'full'} alignItems='flex-start' spacing={8}>
        <VStack w={'full'} alignItems='flex-start' spacing={4}>
          <FormInput
            id='email'
            type='email'
            onChange={inputHandler}
            placeholder='Enter email'
            validators={[VALIDATOR_EMAIL()]}
            errorMessage='Please enter a valid email address.'
          />
          <FormInput
            id='password'
            type={'password'}
            onChange={inputHandler}
            placeholder='Enter password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorMessage='Please enter a valid password, at least 6 characters.'
          />
        </VStack>

        <VStack w={'full'} alignItems='flex-start' spacing={4}>
          <Button
            aria-label='login as a test user'
            disabled={isLoading}
            w='full'
            variant={'outline'}
          >
            Login as a test user
            {isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null}
          </Button>
          <Button
            aria-label='login'
            disabled={!formState.isValid || isLoading}
            w='full'
            variant={'solid'}
            onClick={handleLogin}
          >
            Login
            {isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null}
          </Button>
        </VStack>

        <VStack w='full' alignItems='flex-start' spacing={4}>
          <Divider my={4} />
        </VStack>
        <Text w={'full'} align={'center'}>
          Don't have an account?{' '}
          <Button
            onClick={() => setLoginMode(false)}
            aria-label='open sign up form'
            variant={'link'}
          >
            Sign up.
          </Button>
        </Text>
      </VStack>
      {/* </Box> */}
    </VStack>
  )
}

export default LoginForm
