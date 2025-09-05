'use client'
import { useEffect, useState } from 'react'

import Head from 'next/head'

import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import NEXT13ProgressBar from 'next13-progressbar'
import { Toaster } from 'react-hot-toast'

import { $openAuthPopup } from '@/context/auth'
import {
  $showQuickViewModal,
  $showSizeTable,
  closeQuickViewModal,
} from '@/context/modals'
import {
  closeSizeTableByCheck,
  handleCloseAuthPopup,
  removeOverflowHiddenFromBody,
} from '@/lib/utils/common'

import Layout from './Layout'
import CookieAlert from '../modules/CookieAllert/CookieAllert'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  const [cookieAlertOpen, setCookieAlertOpen] = useState(false)
  const showQuickViewModal = useUnit($showQuickViewModal)
  const showSizeTable = useUnit($showSizeTable)
  const openAuthPopup = useUnit($openAuthPopup)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const handleCloseSizeTable = () => {
    closeSizeTableByCheck(showQuickViewModal)
  }

  useEffect(() => {
    const checkCookie = document.cookie.indexOf('CookieBy=E-shop')
    checkCookie != -1
      ? setCookieAlertOpen(false)
      : setTimeout(() => setCookieAlertOpen(true), 3000)
  }, [])

  return (
    <>
      {isClient ? (
        <html lang='en'>
          <Head>
            <link
              rel='apple-touch-icon'
              sizes='180x180'
              href='/apple-touch-icon.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='/favicon-32x32.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='16x16'
              href='/favicon-16x16.png'
            />
            <link rel='manifest' href='/site.webmanifest' />
          </Head>
          <body>
            <NEXT13ProgressBar height='4px' color='#9466FF' showOnShallow />
            <Layout>{children}</Layout>
            <div
              className={`quick-view-modal-overlay ${
                showQuickViewModal ? 'overlay-active' : ''
              }`}
              onClick={handleCloseQuickViewModal}
            />
            <div
              className={`size-table-overlay ${
                showSizeTable ? 'overlay-active' : ''
              }`}
              onClick={handleCloseSizeTable}
            />
            <div
              className={`auth-overlay ${
                openAuthPopup ? 'overlay-active' : ''
              }`}
              onClick={handleCloseAuthPopup}
            />
            {cookieAlertOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className='cookie-popup'
              >
                <CookieAlert setCookieAlertOpen={setCookieAlertOpen} />
              </motion.div>
            )}
            <Toaster position='top-center' reverseOrder={false} />
          </body>
        </html>
      ) : (
        <html lang='en'>
          <body>
            <></>
          </body>
        </html>
      )}
    </>
  )
}

export default PagesLayout
