import Cookies from 'js-cookie'
import type { UserLogged } from '../types/auth.d'

export async function getSession() {
  try {
    const session = await Promise.resolve(Cookies.get('session'))
    return session ? JSON.parse(session) as UserLogged : null
  } catch (error) {
    return null
  }
}

export async function setSession(session: UserLogged) {
  try {
    await Promise.resolve(Cookies.set('session', JSON.stringify(session)))
    return true
  } catch (error) {
    return false
  }
}
