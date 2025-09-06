import { useState, useEffect } from 'react'

import { useUnit } from 'effector-react'

import { $isAuth } from '@/context/auth'
import { $user } from '@/context/user'

export const useUserAvatar = () => {
  const user = useUnit($user)
  const isAuth = useUnit($isAuth)
  const [src, setSrc] = useState('')
  const [initials, setInitials] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Обрабатываем состояние неаутентифицированного пользователя
    if (!isAuth) {
      setInitials('')
      setSrc('')
      setIsLoading(false)
      return
    }

    // Данные пользователя еще не загружены
    if (!user || Object.keys(user).length === 0) {
      setIsLoading(true)
      return
    }

    // Если есть изображение пользователя
    if (user.image) {
      setSrc(user.image)
      setInitials('')
      setIsLoading(false)
      return
    }

    // Сначала обработаем данные из localStorage
    try {
      const savedData = localStorage.getItem(
        '@@oneclientjs@@::l3Q4jO58IChQRwUkzkHI::@@user@@'
      )
      if (savedData) {
        const oauthAvatar = JSON.parse(savedData)
        if (oauthAvatar?.avatarUrl) {
          setSrc(oauthAvatar.avatarUrl)
        } else {
          setSrc('')
        }
      } else {
        setSrc('')
      }
    } catch (error) {
      console.error('Ошибка при получении данных из localStorage:', error)
      setSrc('')
    }

    // Обработка инициалов
    if (user.name && typeof user.name === 'string') {
      const nameTrimmed = user.name.trim()
      if (nameTrimmed) {
        const nameParts = nameTrimmed.split(' ')
        const first = nameParts[0] || ''
        const last = nameParts[1] || ''

        const firstInitial = first[0] || ''
        const lastInitial = last[0] || ''

        if (firstInitial || lastInitial) {
          setInitials((firstInitial + lastInitial).toUpperCase())
        } else {
          setInitials('??')
        }
      } else {
        setInitials('??')
      }
    } else {
      setInitials('??')
    }

    // В любом случае завершаем загрузку
    setIsLoading(false)
  }, [user, isAuth])

  return {
    src,
    alt: user?.name || 'Пользователь',
    initials,
    isLoading,
  }
}
