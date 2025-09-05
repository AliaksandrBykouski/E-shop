import { forwardRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { AnimatePresence, motion } from 'framer-motion'

import { withClickOutside } from '@/components/hocs/withClickOutside'
import { useLang } from '@/hooks/useLang'
import { useUserLogout } from '@/hooks/useLogout'
import { useUserAvatar } from '@/hooks/useUserAvatar'
import { IWrappedComponentProps } from '@/types/hocs'

const HeaderProfile = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const handleTogglePopup = () => setOpen(!open)
    const handleLogout = useUserLogout()
    const { src, alt, initials } = useUserAvatar()
    const { lang, translations } = useLang()

    return (
      <div className='header-profile__popup' ref={ref}>
        <button
          className='btn-reset header-profile__btn'
          onClick={handleTogglePopup}
          aria-label='User profile menu'
        >
          {src ? (
            <Image src={src} alt={alt || 'profile'} width={24} height={24} />
          ) : (
            <div
              className='header-profile__item__btn'
              title={alt || 'Пользователь'}
            >
              {initials || '??'}
            </div>
          )}
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className='list-reset header-profile__inner'
            >
              <li className='header-profile__arrow' />
              <li className='header-profile__item'>
                <Link
                  href='/profile'
                  className='btn-reset header-profile__item__btn'
                >
                  {translations[lang].header.profile}
                </Link>
              </li>
              <li className='header-profile__item'>
                <button
                  className='btn-reset header-profile__item__btn'
                  onClick={handleLogout}
                  aria-label='Logout'
                >
                  {translations[lang].header.logout}
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

HeaderProfile.displayName = 'HeaderProfile'

export default withClickOutside(HeaderProfile)
