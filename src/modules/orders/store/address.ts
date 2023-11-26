import type { Address } from '@/modules/shared/interfaces'
import { create } from 'zustand'

interface StateActions {
  setAddress: (address: Address) => void
  clearAddress: () => void
}

type State = StateActions & {
  address: Address | null
}

export const useAddress = create<State>((set) => ({
  address: null,
  setAddress: (address: Address) => {
    set((state) => ({
      ...state,
      address
    }))
  },
  clearAddress: () => {
    set((state) => ({
      ...state,
      address: null
    }))
  }
}))
