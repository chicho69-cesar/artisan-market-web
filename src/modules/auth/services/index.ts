import { api } from '@/config/api'
import type { Auth, Response } from '@/modules/shared/interfaces'

export async function signUp(name: string, lastname: string, email: string, password: string, confirmPassword: string, role: string) {
  try {
    const { data: response } = await api.post<Response<Auth>>(
      '/users/sign-up',
      {
        name,
        lastname,
        email,
        password,
        confirm_password: confirmPassword,
        role
      },
      {
        headers: {
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

export async function signIn(email: string, password: string) {
  try {
    const { data: response } = await api.post<Response<Auth>>(
      '/users/sign-in',
      {
        email,
        password
      },
      {
        headers: {
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

export async function signOut(token: string) {
  try {
    const { data: response } = await api.post<Response<string[]>>(
      '/users/sign-out',
      {},
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
