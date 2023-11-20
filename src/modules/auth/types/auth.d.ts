import type { User } from '@/modules/shared/interfaces/user'

export interface UserLogged {
  isLoggedIn: boolean
  user: User | null
  token: string | null
}
