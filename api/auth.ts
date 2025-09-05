import { createEffect } from 'effector'

import toast from 'react-hot-toast'

import { onAuthSuccess } from '@/lib/utils/auth'
import { ISingUpFx } from '@/types/authPopup'

import api from './apiInstance'

export const oauthFx = createEffect(
  async ({ name, password, email }: ISingUpFx) => {
    try {
      const { data } = await api.post('/api/users/oauth', {
        name,
        password,
        email,
      })

      await api.post('/api/users/email', {
        email,
        password,
      })

      onAuthSuccess('OAuth successful', data)
      return data.user
    } catch (error) {
      toast.error('OAuth failed')
    }
  }
)

export const singUpFx = createEffect(
  async ({ name, password, email, isOAuth }: ISingUpFx) => {
    if (isOAuth) {
      await oauthFx({ name, password, email })
      return
    }
    const { data } = await api.post('/api/users/signup', {
      name,
      password,
      email,
    })

    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    await api.post('/api/users/email', {
      email,
      password,
    })

    onAuthSuccess('Registration successful', data)

    return data
  }
)

export const singInFx = createEffect(
  async ({ email, password, isOAuth }: ISingUpFx) => {
    if (isOAuth) {
      await oauthFx({ email, password })
      return
    }
    const { data } = await api.post('/api/users/login', {
      email,
      password,
    })

    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }
    onAuthSuccess('Login successful', data)

    return data
  }
)

export const refreshTokenFx = createEffect(async ({ jwt }: { jwt: string }) => {
  const { data } = await api.post('/api/users/refresh', {
    jwt,
  })

  localStorage.setItem('auth', JSON.stringify(data))

  return data
})
