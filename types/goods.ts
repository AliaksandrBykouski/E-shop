import { ICartItem } from './cart'

export interface ILoadOneProductFX {
  productId: string
  category: string
}

export interface IProductSizesItemProps {
  currentSize: [string, number]
  selectedSize: string
  setSelectedSize: (arg0: string) => void
  currentCartItems: ICartItem[]
}

export interface IProductCounterProps {
  className?: string
  count: number
  setCount: (arg0: number) => void
  cartItem: ICartItem
  updateCountAsync: boolean
  initialCount?: number
  totalCount?: number
  increasePrice?: VoidFunction
  decreasePrice?: VoidFunction
}

export interface IAddToCartBtnProps {
  text: string
  className?: string
  handleAddToCart: VoidFunction
  addToCartSpinner: boolean
  btnDisabled?: boolean
}

export interface IProductCountBySizeProps {
  products: ICartItem[]
  size: string
  withCartIcon?: boolean
}
