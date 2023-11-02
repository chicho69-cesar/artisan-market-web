import { create } from 'zustand'

import { Role, type User, type UserLogged } from '../types/auth.d'
import { getSession } from '../utils/session'

interface StateActions {
  authenticate: (user: User, token: string) => void
}

type State = StateActions & UserLogged

export const useAuth = create<State>((set) => {
  return {
    isLoggedIn: true,
    user: {
      name: 'Cesar',
      lastname: 'Villalobos Olmos',
      email: 'cesarvillalobosolmos.01@gmail.com',
      picture: 'https://picsum.photos/200',
      biography: 'Deserunt excepteur sunt enim esse veniam do.',
      role: Role.Seller
    },
    token: '12345',
    authenticate: (user: User, token: string) => {
      set(() => ({
        isLoggedIn: true,
        user,
        token
      }))
    },
    init: () => {
      set((state) => {
        getSession()
          .then((session) => {
            state.isLoggedIn = !(session == null)
            state.user = (session != null) ? session.user : null
            state.token = (session != null) ? session.token : null
          })

        return state
      })
    }
  }
})
