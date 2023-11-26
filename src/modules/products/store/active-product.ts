import type { Product } from '@/modules/shared/interfaces'
import { create } from 'zustand'

interface StateActions {
  setActiveProduct: (product: Product) => void
}

type State = {
  product: Product | null
} & StateActions

export const useActiveProduct = create<State>((set) => ({
  product: null,
  setActiveProduct: (product) => {
    set({ product })
  }
}))
