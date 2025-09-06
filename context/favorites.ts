import { createDomain, createEffect, sample } from 'effector'

import toast from 'react-hot-toast'

import api from '@/api/apiInstance'
import { handleJWTError } from '@/lib/utils/errors'
import { IAddProductToCartFx } from '@/types/cart'
import {
  IAddProductsFromLSToFavoriteFx,
  IDeleteFavoriteItemsFx,
  IFavoriteItem,
} from '@/types/favorites'

export const getFavoriteItemsFx = createEffect(
  async ({ jwt }: { jwt: string }) => {
    try {
      const { data } = await api.get('/api/favorites/all', {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: IFavoriteItem[] = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'getFavoriteItemsFx',
        })
        return newData
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const addProductToFavoriteFx = createEffect(
  async ({
    jwt,
    setSpinner,
    ...dataFields
  }: Omit<IAddProductToCartFx, 'count'>) => {
    try {
      setSpinner(true)
      const { data } = await api.post('/api/favorites/add', dataFields, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { newFavoriteItem: IFavoriteItem } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductToFavoritesFx',
            payload: { ...dataFields, setSpinner },
          })
        return newData
      }

      toast.success('Product added to favorites')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

export const addProductsFromLSToFavoritesFx = createEffect(
  async ({ jwt, favoriteItems }: IAddProductsFromLSToFavoriteFx) => {
    try {
      const { data } = await api.post(
        '/api/favorites/add-many',
        { items: favoriteItems },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const newData: { cartItems: IFavoriteItem[] } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductsFromLSToFavoritesFx',
            payload: { items: favoriteItems },
          }
        )
        return newData
      }

      loadFavoriteItems({ jwt })
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const deleteFavoriteItemsFx = createEffect(
  async ({ jwt, id, setSpinner }: IDeleteFavoriteItemsFx) => {
    try {
      setSpinner(true)
      const { data } = await api.delete(`/api/favorites/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { id: string } = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'deleteFavoriteItemsFx',
          payload: { id, setSpinner },
        })
        return newData
      }
      toast.success('Removed from favorites')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

const favorites = createDomain()

export const addProductToFavorites =
  favorites.createEvent<Omit<IAddProductToCartFx, 'count'>>()
export const loadFavoriteItems = favorites.createEvent<{ jwt: string }>()
export const setFavoritesFromLS = favorites.createEvent<IFavoriteItem[]>()
export const setIsAddToFavorites = favorites.createEvent<boolean>()
export const addProductsFromLSToFavorites =
  favorites.createEvent<IAddProductsFromLSToFavoriteFx>()
export const setShouldShowEmptyFavorites = favorites.createEvent<boolean>()
export const deleteProductFromFavorites =
  favorites.createEvent<IDeleteFavoriteItemsFx>()

export const $favorites = favorites
  .createStore<IFavoriteItem[]>([])
  .on(getFavoriteItemsFx.done, (_, { result }) => result)
  .on(addProductToFavoriteFx.done, (cart, { result }) => [
    ...new Map(
      [...cart, result.newFavoriteItem].map((item) => [item.clientId, item])
    ).values(),
  ])
  .on(addProductsFromLSToFavoritesFx.done, (_, { result }) => result.items)
  .on(deleteFavoriteItemsFx.done, (state, { result }) =>
    state.filter((item) => item._id !== result.id)
  )

export const $favoritesFromLS = favorites
  .createStore<IFavoriteItem[]>([])
  .on(setFavoritesFromLS, (_, favorites) => favorites)

export const $isAddToFavorites = favorites
  .createStore(false)
  .on(setIsAddToFavorites, (_, value) => value)

export const $shouldShowEmptyFavorites = favorites
  .createStore(false)
  .on(setShouldShowEmptyFavorites, (_, value) => value)

sample({
  clock: addProductToFavorites,
  source: $favorites,
  fn: (_, data) => data,
  target: addProductToFavoriteFx,
})

sample({
  clock: loadFavoriteItems,
  source: $favorites,
  fn: (_, data) => data,
  target: getFavoriteItemsFx,
})

sample({
  clock: addProductsFromLSToFavorites,
  source: $favorites,
  fn: (_, data) => data,
  target: addProductsFromLSToFavoritesFx,
})

sample({
  clock: deleteProductFromFavorites,
  source: $favorites,
  fn: (_, data) => data,
  target: deleteFavoriteItemsFx,
})
