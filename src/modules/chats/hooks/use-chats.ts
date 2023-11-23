import { useEffect, useState } from 'react'

import type { User } from '@/modules/shared/interfaces'
import { useAuth } from '../../auth/store/auth'
import { getMyConversations } from '../services'

export function useChats() {
  const auth = useAuth((state) => state)
  const [isLoading, setIsLoading] = useState(false)
  const [chats, setChats] = useState<User[]>([])

  useEffect(() => {
    setIsLoading(true)
    getListOfChats()
    setIsLoading(false)
  }, [])

  const getListOfChats = async () => {
    const listOfChats = await getMyConversations(auth.token!)
    setChats(listOfChats ?? [])
  }

  return {
    isLoading,
    chats
  }
}
