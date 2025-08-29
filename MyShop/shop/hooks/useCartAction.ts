import { $currentProduct } from '@/context/goods'
import { useUnit } from 'effector-react'

export const useCartAction = () => {
  const product = useUnit($currentProduct)

  return { product }
}
