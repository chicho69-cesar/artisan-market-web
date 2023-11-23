import type { Product } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'
import { getProductsPaginated, searchProductsByQuery } from '../services'

export function useProducts() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setIsLoading(true)
    getProducts()
    setIsLoading(false)
  }, [])

  const searchProducts = async (search: string) => {
    setIsLoading(true)
    const productsSearched = await searchProductsByQuery(search)
    setProducts(productsSearched?.data ?? [])
    setIsLoading(false)
  }

  const getProducts = async (page: number = 1) => {
    const productsObtained = await getProductsPaginated(page)
    setProducts(productsObtained?.data ?? [])
  }

  const refetchProducts = async () => {
    setIsLoading(true)
    getProducts()
    setIsLoading(false)
  }

  return {
    isLoading,
    products,
    searchProducts,
    refetchProducts
  }
}
