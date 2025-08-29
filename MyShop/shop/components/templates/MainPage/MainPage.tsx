'use client'
import BestsellersGoods from '@/components/modules/MainPage/BestsellersGoods'
import BrandLife from '@/components/modules/MainPage/BrandLife'
import Categories from '@/components/modules/MainPage/Categories/Categories'
import Hero from '@/components/modules/MainPage/Hero/Hero'
import NewGoods from '@/components/modules/MainPage/NewGoods'
import { MainPageGate } from '@/context/goods'
import { useGate } from 'effector-react'

const MainPage = () => {
  useGate(MainPageGate)

  return (
    <main>
      <Hero />
      <Categories />
      <NewGoods />
      <BestsellersGoods />
      <BrandLife />
    </main>
  )
}
export default MainPage
