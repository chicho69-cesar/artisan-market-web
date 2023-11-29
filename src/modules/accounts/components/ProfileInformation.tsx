import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAdminProducts } from '@/modules/admin/hooks'
import { useAuth } from '@/modules/auth/store'
import { blankImage, serverUrl } from '@/modules/shared/constants'
import { Roles, type Socials, type User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { useFollows } from '../hooks'
import { followUser, unfollowUser } from '../services'
import SocialNetwork from './SocialNetwork'
// import { IconMessageCircle2Filled } from '@tabler/icons-react'
import { HeaderProfileActions } from '.'

interface Props {
  user: User
  socials: Socials
  isOwner?: boolean
  profileAction: () => void
}

export default function ProfileInformation({ user, socials, isOwner = true, profileAction }: Props) {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const [isFollowing, setIsFollowing] = useState(false)
  const { follows: followers } = useFollows(false, user.id)
  const { follows: followings } = useFollows(true, user.id)
  const { products } = useAdminProducts(user.id)

  useEffect(() => {
    setIsFollowing(followers.some((follower) => follower.id === auth.user!.id))
  }, [followings])

  const handleFollowUser = async () => {
    const response = await followUser(user.id, auth.token!)

    if (response != null) {
      setIsFollowing(true)
    }
  }

  const handleUnFollowUser = async () => {
    const response = await unfollowUser(user.id, auth.token!)

    if (response != null) {
      setIsFollowing(false)
    }
  }

  return (
    <div className='w-1/2 mx-auto'>
      <div className='flex items-center justify-between gap-4 mt-4'>
        <img
          src={
            user.picture == null || user.picture === undefined
              ? blankImage : `${serverUrl}/storage/${user.picture}`
          }
          alt={user.name ?? ''}
          className='object-cover object-center w-40 h-40 rounded-full'
        />

        <div className='flex flex-col flex-1 gap-2'>
          <p className='text-lg font-medium text-gray'>
            {user.name} {user.lastname}
          </p>

          <div className='flex flex-row items-center gap-2'>
            <span className={`py-1 px-3 border border-${theme.mainColor} rounded-full`}>
              <p className={`text-sm font-semibold text-${theme.mainColor}`}>
                {user.role_id === Roles.seller ? 'Vendedor' : 'Usuario'}
              </p>
            </span>

            <button
              onClick={() => {
                if (isOwner) {
                  profileAction()
                } else {
                  if (isFollowing) handleUnFollowUser()
                  else handleFollowUser()
                }
              }}
              className={`py-1 px-3 bg-${theme.mainColor} rounded-full`}
            >
              <p className='font-medium text-white'>
                {
                  isOwner
                    ? 'Editar perfil'
                    : isFollowing
                      ? 'Dejar de seguir'
                      : 'Seguir'
                }
              </p>
            </button>
          </div>

          <div className='flex items-start justify-start gap-6'>
            <Link to={`/followers/${user.id}`}>
              <div className='flex flex-col items-center justify-center gap-1'>
                <p className='text-sm font-medium text-gray'>
                  Seguidores
                </p>

                <p className='text-3xl font-semibold text-gray'>
                  {followers.length}
                </p>
              </div>
            </Link>

            <Link to={`/following/${user.id}`}>
              <div className='flex flex-col items-center justify-center gap-1'>
                <p className='text-sm font-medium text-gray'>
                  Siguiendo
                </p>

                <p className='text-3xl font-semibold text-gray'>
                  {followings.length}
                </p>
              </div>
            </Link>

            {user.role_id === Roles.seller && (
              <div className='flex flex-col items-center justify-center gap-1'>
                <p className='text-sm font-medium text-gray'>
                  Productos
                </p>

                <p className='text-3xl font-semibold text-gray'>
                  {products.length}
                </p>
              </div>
            )}
          </div>

          <div>
            {!Object.values(socials).every((social) => social == null) && (
              <h5 className='w-full text-lg font-medium text-gray'>
                Redes sociales
              </h5>
            )}

            <section className='flex flex-row items-center justify-start gap-2 flex-nowrap'>
              {(socials.facebook != null) && (
                <SocialNetwork
                  social={socials.facebook}
                  name='Facebook'
                  image='/socials/facebook.png'
                />
              )}

              {(socials.twitter != null) && (
                <SocialNetwork
                  social={socials.twitter}
                  name='Twitter'
                  image='/socials/twitter.png'
                />
              )}

              {(socials.linkedin != null) && (
                <SocialNetwork
                  social={socials.linkedin}
                  name='LinkedIn'
                  image='/socials/linkedin.png'
                />
              )}

              {(socials.freeMarket != null) && (
                <SocialNetwork
                  social={socials.freeMarket}
                  name='Mercado Libre'
                  image='/socials/mercado-libre.png'
                />
              )}
            </section>
          </div>
        </div>
      </div>

      {/* {isOwner ? (
        <HeaderProfileActions />
      ) : (
        <Link to={`/chat/${user.id}`}>
          <p className={`flex gap-2 shadow justify-center items-center text-white font-medium mt-4 py-1 px-4 rounded-full bg-${theme.mainColor}`}>
            <IconMessageCircle2Filled
              size={24}
              className='text-white'
            />

            Chatea conmigo
          </p>
        </Link>
      )} */}

      {isOwner && (
        <HeaderProfileActions />
      )}

      <h3 className='mt-4 text-2xl font-medium text-gray'>
        Mi historia
      </h3>

      <p className='text-gray'>
        {user.biography}
      </p>
    </div>
  )
}
