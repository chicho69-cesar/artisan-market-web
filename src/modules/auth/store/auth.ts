import { create } from 'zustand'

import type { User } from '@/modules/shared/interfaces'
import type { UserLogged } from '../types/auth.d'

interface StateActions {
  authenticate: (user: User, token: string) => void
  updateAuthInfo: (user: User) => void
  logout: () => void
}

type State = StateActions & UserLogged

export const useAuth = create<State>((set) => {
  return {
    isLoggedIn: false,
    user: null,
    token: null,
    authenticate: (user: User, token: string) => {
      set((state) => ({
        ...state,
        isLoggedIn: true,
        user,
        token
      }))
    },
    updateAuthInfo: (user: User) => {
      set((state) => ({
        ...state,
        user
      }))
    },
    logout: () => {
      set((state) => ({
        ...state,
        isLoggedIn: false,
        user: null,
        token: null
      }))
    }
  }
})
