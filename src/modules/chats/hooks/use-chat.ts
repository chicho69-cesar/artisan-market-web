import { useEffect, useState } from 'react'

import type { Conversation } from '@/modules/shared/interfaces'
import { useAuth } from '../../auth/store/auth'
import { getConversation } from '../services'

export function useChat(userId: number) {
  const auth = useAuth((state) => state)
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState<Conversation>({
    receive: [],
    send: []
  })

  useEffect(() => {
    setIsLoading(true)
    getListOfChats()
    setIsLoading(false)
  }, [userId])

  const getListOfChats = async () => {
    const chat = await getConversation(userId, auth.token!)
    setConversation(chat ?? {
      receive: [],
      send: []
    })
  }

  return {
    isLoading,
    conversation
  }
}
