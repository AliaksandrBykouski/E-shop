import { Store } from 'effector'

import { useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'

import { IInputs } from '@/types/authPopup'

export const useAuthForm = (initialSpinner: Store<boolean>) => {
  const spinner = useUnit(initialSpinner)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IInputs>()

  const handleSignupWithOAuth = () => ''

  return {
    spinner,
    register,
    errors,
    handleSubmit,
    handleSignupWithOAuth,
  }
}
