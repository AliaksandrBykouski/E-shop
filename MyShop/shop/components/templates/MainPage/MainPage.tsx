'use client'
import BestsellersGoods from '@/components/modules/MainPage/BestsellersGoods'
import Categories from '@/components/modules/MainPage/Categories/Categories'
import Hero from '@/components/modules/MainPage/Hero/Hero'
import { MainPageGate } from '@/context/goods'
import { useGate } from 'effector-react'

const MainPage = () => {
  useGate(MainPageGate)

  return (
    <main>
      <Hero />
      <Categories />
      <BestsellersGoods />
    </main>
  )
}
export default MainPage
