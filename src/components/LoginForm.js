import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'

function LoginForm({ setLoginForm }) {
  const [input, setInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  // const {isLoading, isError, error, run} = useAsync()
  const handleInputChange = (e) => setInput(e.target.value)
  const isLoading = false
  const isError = false

  return (
    <VStack w='full' h='full' p={10} spacing={6} alignItems='center'>
      {/* <Box w='full' h='full' px={[0, 4, 6]} py={8} paddingTop={10}> */}
      <Heading textAlign={'center'} marginBottom={'1rem'} size='lg'>
        Bookworms
      </Heading>
      <VStack w={'full'} alignItems='flex-start' spacing={8}>
        <VStack w={'full'} alignItems='flex-start' spacing={4}>
          <FormControl isRequired isInvalid={isError}>
            <Input
              id='email'
              type='email'
              value={input}
              onChange={handleInputChange}
              placeholder='Enter email'
            />
            {isError && <FormErrorMessage>Email is required.</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired isInvalid={isError}>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={input}
              onChange={handleInputChange}
              placeholder='Enter password'
            />
            <InputRightElement>
              <Button
                aria-label='show password'
                variant={'ghost'}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
            {isError && (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
          </FormControl>
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
            disabled={isLoading}
            w='full'
            variant={'solid'}
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
            onClick={() => setLoginForm(false)}
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
