import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { AppContainer } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import type { Social } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { ProfileInformation } from '../components'
import { getSocialsForAnUser } from '../services'

export default function ProfileScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
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
    getSocials()
  }, [])

  const getSocials = async () => {
    const mySocials = await getSocialsForAnUser(auth.user!.id, auth.token!)

    if (mySocials != null) {
      setSocials(mySocials)
    }
  }

  return (
    <AppContainer>
      <ProfileInformation
        user={auth.user!}
        socials={socials.socials}
        isOwner
        profileAction={() => {
          navigate('/edit-profile')
        }}
      />
    </AppContainer>
  )
}
