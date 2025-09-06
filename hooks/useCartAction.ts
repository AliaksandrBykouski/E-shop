import { useMemo, useState } from 'react'

import { useUnit } from 'effector-react'

import { $cart, $cartFromLS, updateCartItemCount } from '@/context/cart'
import { $currentProduct } from '@/context/goods'
import {
  addCartItemToLS,
  addItemToCart,
  addProductToCartBySizeTable,
} from '@/lib/utils/cart'
import { isUserAuth } from '@/lib/utils/common'

import { useGoodsByAuth } from './useGoodsByAuth'

export const useCartAction = (isSizeTablet = false) => {
  const product = useUnit($currentProduct)
  const [selectedSize, setSelectedSize] = useState('')
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)
  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  )
  const cartItemBySize = currentCartItems.find(
    (item) => item.size === selectedSize
  )
  const existingItem = currentCartByAuth.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )

  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  const [updateCountSpinner, setUpdateCountSpinner] = useState(false)
  const [count, setCount] = useState(+(existingItem?.count as string) || 1)

  const handleAddToCart = (countFromCounter?: number) => {
    if (existingItem) {
      if (!isUserAuth()) {
        addCartItemToLS(product, selectedSize, countFromCounter || 1)
        return
      }

      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const updatedCountWithSize = !!countFromCounter
        ? +existingItem.count !== countFromCounter
          ? countFromCounter
          : +existingItem.count + 1
        : +existingItem.count + 1

      updateCartItemCount({
        jwt: auth.accessToken,
        id: existingItem._id as string,
        setSpinner: setUpdateCountSpinner,
        count: selectedSize.length
          ? updatedCountWithSize
          : +existingItem.count + 1,
      })

      addCartItemToLS(product, selectedSize, countFromCounter || 1)
      return
    }

    if (isSizeTablet) {
      addItemToCart(
        product,
        setAddToCartSpinner,
        countFromCounter || 1,
        selectedSize
      )
      return
    }

    addProductToCartBySizeTable(
      product,
      setAddToCartSpinner,
      countFromCounter || 1,
      selectedSize
    )
  }

  const allCurrentCartItemCount = useMemo(
    () => currentCartItems.reduce((a, { count }) => a + +count, 0),
    [currentCartItems]
  )

  return {
    product,
    selectedSize,
    setSelectedSize,
    addToCartSpinner,
    currentCartItems,
    cartItemBySize,
    handleAddToCart,
    count,
    setCount,
    allCurrentCartItemCount,
    currentCartByAuth,
    setAddToCartSpinner,
    updateCountSpinner,
    existingItem,
  }
}
