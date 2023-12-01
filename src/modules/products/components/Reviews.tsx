import { useNavigate } from '@/modules/shared/hooks'
import type { Review as ReviewType } from '@/modules/shared/interfaces/review'
import { useTheme } from '@/modules/shared/store'
import { Review } from '.'
import { useActiveProduct } from '../store'

interface Props {
  reviews: ReviewType[]
  chunkReviews?: boolean
}

export default function Reviews({ reviews, chunkReviews = false }: Props) {
  const theme = useTheme((state) => state)
  const activeProduct = useActiveProduct((state) => state)
  const { navigate } = useNavigate()

  return (
    <>
      {chunkReviews ? (
        <>
          {reviews.slice(0, 3).map((review) => (
            <Review key={review.id} review={review} />
          ))}

          <p
            onClick={() => {
              if (activeProduct.product != null) {
                navigate(`/reviews/${activeProduct.product.id}`)
              }
            }}
            className={`w-full mb-4 cursor-pointer text-${theme.mainColor} font-medium text-center`}
          >
            Ver más...
          </p>
        </>
      ) : (
        <>
          {reviews?.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </>
      )}
    </>
  )
}
