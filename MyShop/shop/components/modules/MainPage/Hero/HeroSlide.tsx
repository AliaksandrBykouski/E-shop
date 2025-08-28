import Image from 'next/image'
import Link from 'next/link'

import { IHeroSlide } from '@/types/main-page'

import styles from '@/styles/main-page/index.module.scss'

import HeroSlideTooltip from './HeroSlideTooltip'

const HeroSlide = ({ slide }: { slide: IHeroSlide }) => (
  <>
    <Link href='/catalog' className='hero-slide-plus' />
    <Image
      src={slide.image}
      alt={slide.title}
      className={styles.hero__slider__slide__img}
    />
    <HeroSlideTooltip title={slide.title} image={slide.image} />
  </>
)

export default HeroSlide
