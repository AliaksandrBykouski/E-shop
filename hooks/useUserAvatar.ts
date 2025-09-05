import { useState, useEffect } from 'react'

import { useUnit } from 'effector-react'

import { $user } from '@/context/user'

export const useUserAvatar = () => {
  const user = useUnit($user)
  const [src, setSrc] = useState('')
  const [initials, setInitials] = useState('')

  useEffect(() => {
    if (user.image) {
      setSrc(user.image)
      setInitials('')
      return
    }

    const oauthAvatar = JSON.parse(
      localStorage.getItem(
        '@@oneclientjs@@::l3Q4jO58IChQRwUkzkHI::@@user@@'
      ) as string
    )

    if (user.name) {
      const [first = '', last = ''] = user.name.split(' ')
      setInitials((first[0] + last[0]).toUpperCase())
    } else {
      setInitials('??')
    }

    if (oauthAvatar?.avatarUrl) {
      setSrc(oauthAvatar.avatarUrl)
    } else {
      setSrc('')
    }
  }, [user])

  return { src, alt: user.name, initials }
}
