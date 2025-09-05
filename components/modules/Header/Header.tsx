'use client'
import { useEffect } from 'react'

import Link from 'next/link'

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUnit } from 'effector-react'

import { loginCheckFx } from '@/api/authFx'
import { $isAuth } from '@/context/auth'
import {
  $cart,
  $cartFromLS,
  addProductsFromLSToCart,
  setCartFromLS,
  setShouldShowEmpty,
} from '@/context/cart'
import { setLang } from '@/context/lang'
import { openMenu, openSearchModal } from '@/context/modals'
import {
  addOverflowHiddenToBody,
  handleOpenAuthPopup,
  triggerLoginCheck,
} from '@/lib/utils/common'

import CartPopup from './CartPopup/CartPopup'
import HeaderProfile from './HeaderProfile'
import Menu from './Menu'
import { useLang } from '../../../hooks/useLang'
import Logo from '../../elements/Logo/Logo'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { addProductsFromLSToFavorites } from '@/context/favorites'

const Header = () => {
  const isAuth = useUnit($isAuth)
  const { lang, translations } = useLang()
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  // const user = useUnit($user)
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
  }

  const handleOpenSearchModal = () => {
    openSearchModal()
    addOverflowHiddenToBody()
  }

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const lang = JSON.parse(localStorage.getItem('lang') as string)
    const cart = JSON.parse(localStorage.getItem('cart') as string)

    if (lang) {
      if (lang === 'ru' || lang === 'en') {
        setLang(lang)
      }
    }

    triggerLoginCheck()

    if (auth?.accessToken) {
      return
    }

    if (cart && Array.isArray(cart)) {
      if (!cart.length) {
        setShouldShowEmpty(true)
        return
      }
      setCartFromLS(cart)
    }

    triggerLoginCheck()
  }, [])

  useEffect(() => {
    if (isAuth) {
      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const cartFromLS = JSON.parse(localStorage.getItem('cart') as string)
      const favoritesFromLS = JSON.parse(
        localStorage.getItem('favorites') as string
      )
      const comparisonFromLS = JSON.parse(
        localStorage.getItem('comparison') as string
      )

      if (cartFromLS && Array.isArray(cartFromLS)) {
        addProductsFromLSToCart({
          jwt: auth.accessToken,
          cartItems: cartFromLS,
        })
      }

      if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
        addProductsFromLSToFavorites({
          jwt: auth.accessToken,
          favoriteItems: favoritesFromLS,
        })
      }

      // if (comparisonFromLS && Array.isArray(comparisonFromLS)) {
      //   addProductsFromLSToComparison({
      //     jwt: auth.accessToken,
      //     comparisonItems: comparisonFromLS,
      //   })
      // }
    }
  }, [isAuth])

  return (
    <header className='header'>
      <div className='container header__container'>
        <button
          className='btn-reset header__burger'
          type='button'
          onClick={handleOpenMenu}
          aria-label='Open catalog category menu'
        >
          {translations[lang].header.menu_btn}
        </button>
        <Menu />
        <div className='header__logo'>
          <Logo />
        </div>
        <ul className='header__links list-reset'>
          <li className='header__links__item'>
            <button
              className='btn-reset header__links__item__btn header__links__item__btn--search'
              type='button'
              onClick={handleOpenSearchModal}
              aria-label='Open search modal'
            />
          </li>
          <li className='header__links__item'>
            <Link
              href='/favorites'
              className='header__links__item__btn header__links__item__btn--favorites'
            />
          </li>
          <li className='header__links__item'>
            <Link
              href='/compare'
              className='header__links__item__btn header__links__item__btn--compare'
            />
          </li>
          <li className='header__links__item'>
            <CartPopup />
          </li>
          <li className='header__links__item header__links__item__btn--profile'>
            {isAuth ? (
              <HeaderProfile />
            ) : loginCheckSpinner ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <button
                className='btn-reset header__links__item__btn header__links__item__btn--profile'
                onClick={handleOpenAuthPopup}
                aria-label='Open login form'
              />
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
