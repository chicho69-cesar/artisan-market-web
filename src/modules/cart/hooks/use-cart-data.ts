import { useEffect, useState } from 'react'
import { useCart } from '../store'
import type { CartOrderData } from '../types/cart'

export function useCartData() {
  const cart = useCart((state) => state.cart)
  const [orderData, setOrderData] = useState<CartOrderData>({
    noOfProducts: 0,
    subTotal: 0,
    tax: 0,
    total: 0
  })

  useEffect(() => {
    const noOfProducts = cart.reduce((acc, curr) => {
      return acc + curr.quantity
    }, 0)

    const subTotal = cart.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price
    }, 0)

    const tax = subTotal * 0.16
    const total = subTotal * 1.16

    setOrderData({
      noOfProducts,
      subTotal,
      tax,
      total
    })
  }, [cart])

  return {
    orderData
  }
}
