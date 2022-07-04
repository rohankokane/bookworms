import {
  Button,
  Divider,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import SiteLogo from '../SiteLogo'
import { prepareFormData, useForm } from 'hooks/form-hook'
import FormInput from '../Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from 'utils/validators'
import { useDispatch } from 'react-redux'
import { loginUser } from 'store/userSlice'
import { useSelector } from 'react-redux'
import { STATUS_PENDING } from 'utils/constants'

function LoginForm({ setLoginMode }) {
  const toast = useToast()
  const dispatch = useDispatch()
  const { status, error } = useSelector((state) => state.user)
  const isLoading = status === STATUS_PENDING

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
  const handleLogin = async (data) => {
    let loginFormData

    if (data === undefined) loginFormData = prepareFormData(formState)
    else loginFormData = prepareFormData(data)

    dispatch(loginUser({ data: loginFormData }))
      .then((action) => {
        if (!action.error) return
        toast({
          title: 'Error occurred',
          description: `${action?.error?.message} Please try again`,
          status: 'error',
          position: 'bottom-right',
          duration: 5000,
          isClosable: true,
        })
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
  const guestLogin = () => {
    handleLogin({
      inputs: {
        email: {
          value: 'guest@gmail.com',
          isValid: true,
        },
        password: {
          value: '123456',
          isValid: true,
        },
      },
      isValid: true,
    })
  }

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
            aria-label='guest login'
            disabled={isLoading}
            w='full'
            variant={'outline'}
            onClick={guestLogin}
          >
            Login as a Guest User
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
