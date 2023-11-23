import { useAuth } from '@/modules/auth/store'
import type { Order } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'
import { getUserOrders } from '../services'

export function useOrdersHistory() {
  const auth = useAuth((state) => state)
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setIsLoading(true)
    getOrders()
    setIsLoading(false)
  }, [])

  const getOrders = async () => {
    const userOrders = await getUserOrders(auth.token!)
    setOrders(userOrders ?? [])
  }

  return {
    isLoading,
    orders
  }
}
