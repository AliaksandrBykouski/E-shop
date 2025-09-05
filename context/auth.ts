import { createDomain, sample } from 'effector'

import toast from 'react-hot-toast'

import { singInFx, singUpFx } from '@/api/auth'
import { ISingUpFx } from '@/types/authPopup'

const auth = createDomain()

export const openAuthPopup = auth.createEvent()
export const closeAuthPopup = auth.createEvent()
export const handleSignUp = auth.createEvent<ISingUpFx>()
export const handleSignIn = auth.createEvent<ISingUpFx>()
export const setIsAuth = auth.createEvent<boolean>()

export const $openAuthPopup = auth
  .createStore<boolean>(false)
  .on(openAuthPopup, () => true)
  .on(closeAuthPopup, () => false)

export const $isAuth = auth
  .createStore(false)
  .on(setIsAuth, (_, isAuth) => isAuth)

export const $auth = auth
  .createStore({})
  .on(singUpFx.done, (_, { result }) => result)
  .on(singUpFx.fail, (_, { error }) => {
    toast.error(error.message)
  })
  .on(singInFx.done, (_, { result }) => result)
  .on(singInFx.fail, (_, { error }) => {
    toast.error(error.message)
  })

sample({
  clock: handleSignUp,
  source: $auth,
  fn: (_, { name, email, password, isOAuth }) => ({
    name,
    password,
    email,
    isOAuth,
  }),
  target: singUpFx,
})

sample({
  clock: handleSignIn,
  source: $auth,
  fn: (_, { email, password, isOAuth, name }) => ({
    email,
    password,
    isOAuth,
    name,
  }),
  target: singInFx,
})
export { singUpFx, singInFx }
