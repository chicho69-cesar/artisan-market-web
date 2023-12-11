import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '@/modules/auth/store'
import { AppContainer } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import type { Social, User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { ProfileInformation } from '../components'
import { getSocialsForAnUser, getUserById } from '../services'

export default function UserScreen() {
  const { id } = useParams()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const [isOwner, setIsOwner] = useState(false)
  const [user, setUser] = useState<User>()
  const { navigate } = useNavigate()

  const [socials, setSocials] = useState<Social>({
    socials: {
      facebook: null,
      twitter: null,
      linkedin: null,
      freeMarket: null
    }
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      getUser(id)
    }
  }, [id])

  useEffect(() => {
    if (user !== undefined) {
      getSocials()
    }
  }, [user])

  const getUser = async (id: string) => {
    const user = await getUserById(Number(id), auth.token!)

    if (user != null) {
      setUser(user)
      setIsOwner(user.id === auth.user?.id)
    }
  }

  const getSocials = async () => {
    const userSocials = await getSocialsForAnUser(user!.id, auth.token!)

    if (userSocials != null) {
      setSocials(userSocials)
    }
  }

  return (
    <AppContainer>
      {(user != null || user !== undefined) && (
        <ProfileInformation
          user={user}
          socials={socials.socials}
          isOwner={isOwner}
          profileAction={() => {
            navigate('/edit-profile')
          }}
        />
      )}
    </AppContainer>
  )
}
