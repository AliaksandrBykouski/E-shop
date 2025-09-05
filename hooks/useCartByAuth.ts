import { useUnit } from 'effector-react'

import { $isAuth } from '@/context/auth'
import { $cart, $cartFromLS } from '@/context/cart'

export const useCartByAuth = () => {
  const cart = useUnit($cart)
  const isAuth = useUnit($isAuth)
  const cartFromLS = useUnit($cartFromLS)
  const currentCartByAuth = isAuth ? cart : cartFromLS

  return currentCartByAuth
}
