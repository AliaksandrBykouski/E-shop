import { JSX } from 'react'

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
