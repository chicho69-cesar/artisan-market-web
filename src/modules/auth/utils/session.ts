import Cookies from 'js-cookie'
import type { UserLogged } from '../types/auth.d'

const COOKIE_NAME = 'session'

export async function getSession() {
  try {
    const session = await Promise.resolve(Cookies.get(COOKIE_NAME))
    return session ? JSON.parse(session) as UserLogged : null
  } catch (error) {
    return null
  }
}

export async function setSession(session: UserLogged) {
  try {
    await Promise.resolve(Cookies.set(COOKIE_NAME, JSON.stringify(session), { expires: 7 }))
    return true
  } catch (error) {
    return false
  }
}

export function clearSession() {
  try {
    Cookies.remove(COOKIE_NAME)
    return true
  } catch (error) {
    return false
  }
}
