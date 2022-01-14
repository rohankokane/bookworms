import { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function AuthenticationForm({ isLoginMode, setLoginMode }) {
  // const [input, setInput] = useState('')
  // const [showPassword, setShowPassword] = useState(false)
  // // const {isLoading, isError, error, run} = useAsync()
  // const handleInputChange = (e) => setInput(e.target.value)
  // const isLoading = false
  // const isError = false

  return isLoginMode ? (
    <LoginForm setLoginMode={setLoginMode} />
  ) : (
    <SignUpForm setLoginMode={setLoginMode} />
  )
}

export default AuthenticationForm
