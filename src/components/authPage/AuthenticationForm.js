import { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function AuthenticationForm({ isLoginMode, setLoginMode }) {
  return isLoginMode ? (
    <LoginForm setLoginMode={setLoginMode} />
  ) : (
    <SignUpForm setLoginMode={setLoginMode} />
  )
}

export default AuthenticationForm
