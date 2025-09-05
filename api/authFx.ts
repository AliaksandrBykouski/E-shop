import { createEffect } from 'effector'

import toast from 'react-hot-toast'

import { setIsAuth } from '@/context/auth'
import { handleJWTError } from '@/lib/utils/errors'

import api from './apiInstance'

export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await api.get('/api/users/login-check', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    if (data?.error) {
      handleJWTError(data.error, {
        repeatRequestMethodName: 'loginCheckFx',
      })
      return
    }

    setIsAuth(true)
    return data.user
  } catch (error) {
    toast.error((error as Error).message)
  }
})
