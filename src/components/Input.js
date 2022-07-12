import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputRightElement,
  Textarea,
} from '@chakra-ui/react'
import { useEffect, useReducer, useState } from 'react'
import { validate } from 'utils/validators'

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      }
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      }
    }
    default:
      return state
  }
}

function FormInput({
  id = '', //req
  type = 'text',
  isRequired = false,
  placeholder = '',
  onChange: formChange, //req
  validators,
  errorMessage = '',
  initialValue,
  initialValid,
  rows, //if textarea
  ...restProps
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isTouched: false,
    isValid: initialValid || false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const { value, isValid, isTouched } = inputState

  useEffect(() => {
    formChange(id, value, isValid)
  }, [id, value, isValid, formChange])

  const handleInputChange = (event) => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validators: validators || [],
    })
  }

  const handleFocusChange = () => {
    dispatch({
      type: 'TOUCH',
    })
  }

  let inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={errorMessage && isTouched && !isValid}
    >
      {inputType === 'textarea' ? (
        <Textarea
          focusBorderColor={'brand.500'}
          id={id}
          rows={rows || 3}
          value={value}
          onChange={handleInputChange}
          onBlur={handleFocusChange}
          placeholder={placeholder}
          size='sm'
        />
      ) : (
        <Input
          id={id}
          type={inputType}
          value={value}
          onChange={handleInputChange}
          onBlur={handleFocusChange}
          placeholder={placeholder}
          {...restProps}
        />
      )}

      {type === 'password' && (
        <InputRightElement>
          <Button
            aria-label='show password'
            variant={'ghost'}
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      )}
      {errorMessage && !isValid && isTouched && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default FormInput
