'use client'
import { useUnit } from 'effector-react'
import { useLang } from '@/hooks/useLang'
import { getBestsellerProductsFx } from '@/api/main-page'
import { $bestsellerProducts } from '@/context/goods'
import MainPageSection from './MainPageSection'

const BestsellersGoods = () => {
  const goods = useUnit($bestsellerProducts)
  const spinner = useUnit(getBestsellerProductsFx.pending)
  const { lang, translations } = useLang()

  return (
    <MainPageSection
      title={translations[lang].main_page.bestsellers_title}
      goods={goods}
      spinner={spinner}
    />
  )
}

export default BestsellersGoods
