import { useAuth } from '@/modules/auth/store'
import type { Product } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'
import { getSellerProducts } from '../services'

export function useAdminProducts(adminId: number) {
  const auth = useAuth((state) => state)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setIsLoading(true)
    getProducts()
    setIsLoading(false)
  }, [])

  const getProducts = async () => {
    const adminProducts = await getSellerProducts(adminId, auth.token!)
    setProducts(
      adminProducts == null ? [] : adminProducts.data
    )
  }

  return {
    isLoading,
    products
  }
}
