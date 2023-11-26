import { create } from 'zustand'

import type { Product } from '@/modules/shared/interfaces'
import type { Cart } from '../types/cart.d'

interface StateActions {
  addProductToCart: (product: Product) => void
  removeProductFromCart: (product: Product) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  resetCart: () => void
}

type State = StateActions & {
  cart: Cart[]
}

export const useCart = create<State>((set) => ({
  cart: [],
  addProductToCart: (product: Product) => {
    set((state) => {
      if (state.cart.some((cart) => cart.product.id === product.id)) return state

      return {
        ...state,
        cart: [...state.cart, { product, quantity: 1 }]
      }
    })
  },
  removeProductFromCart: (product: Product) => {
    set((state) => ({
      ...state,
      cart: state.cart.filter((cart) => cart.product.id !== product.id)
    }))
  },
  increaseQuantity: (productId: number) => {
    set((state) => {
      const newCart = state.cart.map((cart) => {
        if (cart.product.id === productId && cart.quantity < cart.product.stock) {
          cart.quantity++
        }

        return cart
      })

      return {
        ...state,
        cart: [...newCart]
      }
    })
  },
  decreaseQuantity: (productId: number) => {
    set((state) => {
      const newCart = state.cart.map((cart) => {
        if (cart.product.id === productId && cart.quantity > 0) {
          cart.quantity--
        }

        return cart
      })

      return {
        ...state,
        cart: [...newCart]
      }
    })
  },
  resetCart: () => {
    set((state) => ({
      ...state,
      cart: []
    }))
  }
}))
