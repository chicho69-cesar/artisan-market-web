import { api } from '@/config/api'
import type { Conversation, Message, Response, User } from '@/modules/shared/interfaces'

export async function sendMessage(userToSend: number, message: string, token: string) {
  try {
    const { data: response } = await api.post<Response<Message>>(
      '/users/send-message',
      {
        user_to_send_message: userToSend,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getConversation(userId: number, token: string) {
  try {
    const { data: response } = await api.get<Response<Conversation>>(
      `/users/conversation/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getMyConversations(token: string) {
  try {
    const { data: response } = await api.get<Response<User[]>>(
      '/users/my-conversations',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}
