import { StaticImageData } from 'next/image'

export interface IHeroSlide {
  id?: number
  title: string
  image: StaticImageData
}

export type IHeroSlideTooltip = IHeroSlide
