import { useEffect } from 'react'

import { AppButton, AppContainer, AppHeader } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { Reviews } from '../components'
import { useReviews } from '../hooks'
import { useActiveProduct } from '../store'

export default function ReviewsScreen() {
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()
  const { product } = useActiveProduct((state) => state)
  const { reviews } = useReviews(product?.id ?? 0)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <div className='w-1/2 mx-auto'>
        <AppHeader
          title='Reviews'
          description={`Reviews del producto ${product?.name}`}
        />

        <AppButton
          text='Agregar review'
          bgColor={theme.mainColor}
          color={colors.white}
          onPress={() => {
            if (product != null) {
              navigate(`/add-review/${product.id}`)
            }
          }}
        />

        <Reviews reviews={reviews ?? []}/>
      </div>

    </AppContainer>
  )
}
