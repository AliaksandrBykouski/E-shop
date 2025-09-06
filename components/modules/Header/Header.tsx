'use client'
import { useEffect } from 'react'

import Link from 'next/link'

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUnit } from 'effector-react'

import { loginCheckFx } from '@/api/authFx'
import { $isAuth } from '@/context/auth'
import {
  addProductsFromLSToCart,
  setCartFromLS,
  setShouldShowEmpty,
} from '@/context/cart'
import {
  $favorites,
  $favoritesFromLS,
  addProductsFromLSToFavorites,
  setFavoritesFromLS,
  setShouldShowEmptyFavorites,
} from '@/context/favorites'
import { setLang } from '@/context/lang'
import { openMenu, openSearchModal } from '@/context/modals'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
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

const Header = () => {
  const isAuth = useUnit($isAuth)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  const { lang, translations } = useLang()
  // const user = useUnit($user)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

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
    const favoritesFromLS = JSON.parse(
      localStorage.getItem('favorites') as string
    )

    if (lang) {
      if (lang === 'ru' || lang === 'en') {
        setLang(lang)
      }
    }

    triggerLoginCheck()

    if (!favoritesFromLS || !favoritesFromLS?.length) {
      setShouldShowEmptyFavorites(true)
    }

    if (!cart || !cart?.length) {
      setShouldShowEmpty(true)
    }

    if (auth?.accessToken) {
      return
    }

    if (cart && Array.isArray(cart)) {
      if (!cart.length) {
        setShouldShowEmpty(true)
      } else {
        setCartFromLS(cart)
      }
    }

    if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
      if (!favoritesFromLS.length) {
        setShouldShowEmptyFavorites(true)
      } else {
        setFavoritesFromLS(favoritesFromLS)
      }
    }
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
            >
              {!!currentFavoritesByAuth.length && (
                <span className='not-empty' />
              )}
            </Link>
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
