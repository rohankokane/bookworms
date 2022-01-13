import { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function AuthenticationForm() {
  const [loginForm, setLoginForm] = useState(true)
  // const [input, setInput] = useState('')
  // const [showPassword, setShowPassword] = useState(false)
  // // const {isLoading, isError, error, run} = useAsync()
  // const handleInputChange = (e) => setInput(e.target.value)
  // const isLoading = false
  // const isError = false

  return loginForm ? (
    <LoginForm setLoginForm={setLoginForm} />
  ) : (
    <SignUpForm setLoginForm={setLoginForm} />
  )
}

export default AuthenticationForm
