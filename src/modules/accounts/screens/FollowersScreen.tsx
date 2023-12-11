import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '@/modules/auth/store'
import { AppContainer, AppHeader, Avatar } from '@/modules/shared/components'
import { blankImage, serverUrl } from '@/modules/shared/constants'
import { useNavigate } from '@/modules/shared/hooks'
import type { User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { useFollows } from '../hooks'
import { getUserById } from '../services'

export default function FollowersScreen() {
  const { id } = useParams()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const [user, setUser] = useState<User>()
  const { follows, fetchFollows } = useFollows(false)
  const { navigate } = useNavigate()

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
      fetchFollows(user.id)
    }
  }, [user])

  const getUser = async (id: string) => {
    const user = await getUserById(Number(id), auth.token!)

    if (user != null) {
      setUser(user)
    }
  }

  return (
    <AppContainer>
      <div className='w-1/2 mx-auto'>
        <AppHeader
          title='Seguidores'
          description={`Personas que siguen a ${user?.name} ${user?.lastname}`}
        />

        {follows.map((follow) => (
          <div
            key={follow.id}
            className='w-full py-2 border-b cursor-pointer border-lightGray'
            onClick={() => navigate(`/user-profile/${follow.id}`)}
          >
            <div className='flex flex-row items-center justify-start gap-2'>
              <Avatar
                source={
                  follow.picture == null || follow.picture === undefined
                    ? blankImage : `${serverUrl}/storage/${follow.picture}`
                }
                alt={follow.name}
              />

              <p className='text-lg text-gray'>
                {follow.name} {follow.lastname}
              </p>
            </div>
          </div>
        ))}
      </div>
    </AppContainer>
  )
}
