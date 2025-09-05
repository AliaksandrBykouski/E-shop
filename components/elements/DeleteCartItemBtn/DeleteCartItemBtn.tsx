import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IDeletedCartItemBtnProps } from '@/types/cart'

const DeleteCartItemBtn = ({
  btnDisabled,
  callback,
  className,
}: IDeletedCartItemBtnProps) => (
  <button
    className={`btn-reset cart-list__item__delete ${className}`}
    onClick={callback}
    disabled={btnDisabled}
    aria-label='Delete item from cart'
  >
    {btnDisabled ? (
      <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
    ) : (
      <span />
    )}
  </button>
)
export default DeleteCartItemBtn
