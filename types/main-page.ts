import { StaticImageData } from 'next/image'

import { IProduct } from './common'

export interface IHeroSlide {
  id?: number
  title: string
  image: StaticImageData
}

export type IHeroSlideTooltip = IHeroSlide

export interface IMainPageSectionProps {
  title: string
  goods: IProduct[]
  spinner: boolean
}
