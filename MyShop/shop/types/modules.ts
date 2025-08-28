import { JSX } from 'react'
import { IProduct } from './common'

export interface IAccordionProps {
  title: string | JSX.Element
  children: React.ReactNode
  titleClass: string
  rotateIconClass?: string
}

export interface IMenuLinkItemProps {
  item: {
    id: number
    text: string
    href: string
  }
  handleRedirectToCatalog: (arg0: string) => void
}

export interface ICatalogMenuButtonProps {
  isActive: boolean
  name: string
  handler: VoidFunction
}

export interface IProductsListItemProps {
  item: IProduct
  title?: string
}

export interface IProductLabelProps {
  isNew?: boolean
  isBestseller?: boolean
}
