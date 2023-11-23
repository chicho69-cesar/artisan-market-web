import { useAuth } from '@/modules/auth/store'
import type { User } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'
import { getFollowers, getFollowings } from '../services'

export function useFollows(following: boolean, userId?: number) {
  const auth = useAuth((state) => state)
  const [isLoading, setIsLoading] = useState(false)
  const [follows, setFollows] = useState<User[]>([])

  useEffect(() => {
    if (userId !== undefined) {
      fetchFollows(userId)
    }
  }, [])

  const fetchFollows = async (userId: number) => {
    setIsLoading(true)

    const follows = following
      ? await getFollowings(userId, auth.token!)
      : await getFollowers(userId, auth.token!)

    setFollows(follows ?? [])

    setIsLoading(false)
  }

  return {
    isLoading,
    follows,
    fetchFollows
  }
}
