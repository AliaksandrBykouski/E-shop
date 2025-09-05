'use client'
import { useUnit } from 'effector-react'

import { showSizeTable, $showQuickViewModal } from '@/context/modals'
import { setSizeTableSizes } from '@/context/sizeTable'
import { useLang } from '@/hooks/useLang'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import { ISelectedSizes } from '@/types/common'

const ProductSizeTableBtn = ({ sizes, type, className }: ISelectedSizes) => {
  const { lang, translations } = useLang()
  const showQuickViewModal = useUnit($showQuickViewModal)

  const handleShowSizeTable = () => {
    if (!showQuickViewModal) {
      addOverflowHiddenToBody()
    }

    setSizeTableSizes({ sizes, type })
    showSizeTable()
  }

  return (
    <button
      className={`btn-reset ${className}`}
      onClick={handleShowSizeTable}
      aria-label='Show size table'
    >
      {translations[lang].product.size_table}
    </button>
  )
}

export default ProductSizeTableBtn
