import { useEffect } from 'react'

import { useUnit } from 'effector-react'

import { $cart, $cartFromLS, $totalPrice, setTotalPrice } from '@/context/cart'

import { useGoodsByAuth } from './useGoodsByAuth'
import { usePriceAnimation } from './usePricceAnimation'

export const useTotalPrice = () => {
  const totalPrice = useUnit($totalPrice)
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)

  const getNewTotal = () =>
    currentCartByAuth
      .map((item) => +item.price * +item.count)
      .reduce((defaultCount, item) => defaultCount + item, 0)

  const {
    value: animatedPrice,
    setFrom,
    setTo,
  } = usePriceAnimation(totalPrice, getNewTotal())

  useEffect(() => {
    setTotalPrice(getNewTotal())
    setFrom(totalPrice)
    setTo(getNewTotal())
  }, [currentCartByAuth])

  return { animatedPrice }
}
