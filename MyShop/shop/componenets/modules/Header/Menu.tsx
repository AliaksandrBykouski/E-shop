import { useLang } from '@/hooks/useLang'
import { useState } from 'react'
import { useUnit } from 'effector-react/effector-react.umd'
import { $isMenuOpen } from '@/context/madals'

const Menu = () => {
  const [showCatalogList, setShowCatalogList] = useState(false)
  const [showBuyersList, setShowBuyersList] = useState(false)
  const [showContactList, setShowContactList] = useState(false)
  const menuIsOpen = useUnit($isMenuOpen)
  const { lang, translations } = useLang()

  return (
    <nav className={`nav-menu ${menuIsOpen ? 'open' : 'close'}`}>
      <h1>Menu</h1>
    </nav>
  )
}

export default Menu
