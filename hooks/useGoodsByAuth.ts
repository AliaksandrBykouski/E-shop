import { useUnit } from 'effector-react'
import { $isAuth } from '@/context/auth'
import { UseGoodsByAuth } from '@/types/common'

export const useGoodsByAuth = <T>(
  storeAsync: UseGoodsByAuth<T>,
  storeSync: UseGoodsByAuth<T>
) => {
  const goods = useUnit(storeAsync)
  const isAuth = useUnit($isAuth)
  const goodsFromLS = useUnit(storeSync)
  const currentGoodsByAuth = isAuth ? goods : goodsFromLS

  return currentGoodsByAuth
}
