'use client'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import Footer from '@/components/modules/Footer/Footer'
import Header from '@/components/modules/Header/Header'
import {
  $searchModal,
  $showQuickViewModal,
  showQuickViewModal,
} from '@/context/modals'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { handleCloseSearchModal } from '@/lib/utils/common'

import SearchModal from '../modules/Header/SearchModal'
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar'
import QuickViewModal from '../modules/QuickViewModal/QuickViewModal'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMedia800 = useMediaQuery(800)
  const searchModal = useUnit($searchModal)
  const showQuickViewModal = useUnit($showQuickViewModal)
  return (
    <>
      <Header />
      {children}
      {isMedia800 && <MobileNavbar />}
      <AnimatePresence>
        {searchModal && (
          <motion.div
            initial={{ opacity: 0, zIndex: 102 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchModal />
          </motion.div>
        )}
      </AnimatePresence>
      {!isMedia800 && (
        <AnimatePresence>
          {showQuickViewModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuickViewModal />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <div
        className={`header__search-overlay ${searchModal ? 'overlay-active' : ''}`}
        onClick={handleCloseSearchModal}
      />
      <Footer />
    </>
  )
}

export default Layout
