import type { Review } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'
import { getReviewsOfProduct } from '../services'

export function useReviews(productId: number) {
  const [isLoading, setIsLoading] = useState(false)
  const [reviews, setReviews] = useState<Review[]>()

  useEffect(() => {
    if (productId === 0) return

    setIsLoading(true)
    getReviews()
    setIsLoading(false)
  }, [])

  const getReviews = async () => {
    const reviewsObtained = await getReviewsOfProduct(productId)
    setReviews(reviewsObtained ?? [])
  }

  return {
    isLoading,
    reviews
  }
}
