import type { Product } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'
import { getFeaturedProducts } from '../services'

export function useFeaturedProducts() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setIsLoading(true)
    getProducts()
    setIsLoading(false)
  }, [])

  const getProducts = async () => {
    const productsObtained = await getFeaturedProducts()
    setProducts(productsObtained ?? [])
  }

  return {
    isLoading,
    products
  }
}
