import { useAuth } from '@/modules/auth/store'
import type { AdminOrder } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'
import { getSellerOrders } from '../services'

export function useSellerOrders() {
  const auth = useAuth((state) => state)
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<AdminOrder[]>([])

  useEffect(() => {
    setIsLoading(true)
    getOrders()
    setIsLoading(false)
  }, [])

  const getOrders = async () => {
    const sellerOrders = await getSellerOrders(auth.token!)
    setOrders(sellerOrders ?? [])
  }

  return {
    isLoading,
    orders
  }
}
