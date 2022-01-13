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

function SignUpForm({ setLoginForm }) {
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
      <Heading size={'sm'} color={'gray'}>
        Sign up to join the community of bookworms.
      </Heading>
      <VStack w={'full'} alignItems='flex-start' spacing={8}>
        <VStack w={'full'} alignItems='flex-start' spacing={4}>
          <FormControl isRequired isInvalid={isError}>
            <Input
              id='fullName'
              type='text'
              value={input}
              onChange={handleInputChange}
              placeholder='Full name'
            />
            {isError && (
              <FormErrorMessage>Please enter your full name.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={isError}>
            <Input
              id='email'
              type='email'
              value={input}
              onChange={handleInputChange}
              placeholder='Email'
            />
            {isError && (
              <FormErrorMessage>Please enter valid email id.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={isError}>
            <Input
              id='userName'
              type='text'
              value={input}
              onChange={handleInputChange}
              placeholder='Username'
            />
            {isError && (
              <FormErrorMessage>Please enter an user name.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={isError}>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={input}
              onChange={handleInputChange}
              placeholder='Password'
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
              <FormErrorMessage>
                Password length should contain minimum 6 characters
              </FormErrorMessage>
            )}
          </FormControl>
        </VStack>

        <VStack w={'full'} alignItems='flex-start' spacing={4}>
          <Button
            aria-label='login'
            disabled={isLoading}
            w='full'
            variant={'solid'}
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
            onClick={() => setLoginForm(true)}
            aria-label='open sign up form'
            variant={'link'}
          >
            login.
          </Button>
        </Text>
      </VStack>
      {/* </Box> */}
    </VStack>
  )
}

export default SignUpForm
