import {
  faGithub,
  faGoogle,
  faVk,
  faYandex,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AuthPopupSocials = ({
  handleSignupWithOAuth,
}: {
  handleSignupWithOAuth: VoidFunction
}) => (
  <div className='cart-body__socials'>
    <button
      className='btn-reset socials__btn gh-color'
      onClick={handleSignupWithOAuth}
      aria-label='Sign up with GitHub'
    >
      <FontAwesomeIcon icon={faGithub} beat />
    </button>
    <button
      className='btn-reset socials__btn g-color'
      onClick={handleSignupWithOAuth}
      aria-label='Sign up with Google'
    >
      <FontAwesomeIcon icon={faGoogle} shake />
    </button>
    <button
      className='btn-reset socials__btn y-color'
      onClick={handleSignupWithOAuth}
      aria-label='Sign up with Yandex'
    >
      <FontAwesomeIcon icon={faYandex} bounce />
    </button>
    <button
      className='btn-reset socials__btn vk-color'
      onClick={handleSignupWithOAuth}
      aria-label='Sign up with VKontakte'
    >
      <FontAwesomeIcon icon={faVk} shake />
    </button>
  </div>
)

export default AuthPopupSocials
