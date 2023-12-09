import { IconStarFilled } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { AppAlert, AppButton, AppContainer, AppHeader, AppTextArea } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { makeValidation, reviewSchema } from '@/modules/shared/validations'
import { addReview } from '../services'
import { useActiveProduct } from '../store'

export default function AddReviewScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const { product } = useActiveProduct((state) => state)
  const { navigate } = useNavigate()

  const [myRate, setMyRate] = useState(0)
  const [review, setReview] = useState('')
  const [isAnError, setIsAnError] = useState(false)
  const [reviewError, setReviewError] = useState<string | null>(null)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const onHandleGrade = (rate: number) => {
    setMyRate(rate)
  }

  const handleAddReview = async () => {
    const validatedReview = await makeValidation(reviewSchema, review)
    setReviewError(validatedReview)

    if (validatedReview != null) return
    if (product == null) return

    const response = await addReview(product.id, myRate, review, auth.token!)

    if (response != null) {
      navigate('/home')
    } else {
      setIsAnError(true)
    }
  }

  return (
    <AppContainer>
      <AppAlert
        alertIsOpen={isAnError}
        setAlertIsOpen={setIsAnError}
        description='Error al agregar la review'
        title='Error!'
      />

      <section className='w-1/2 mx-auto'>
        <AppHeader
          title='Agrega una review'
          description='Añade una review personal sobre este producto'
        />

        <div className='flex items-center justify-start w-full gap-2 mb-4'>
          {[1, 2, 3, 4, 5].map((rate) => (
            <span
              key={rate}
              onClick={() => {
                onHandleGrade(rate)
              }}
            >
              <IconStarFilled
                key={rate}
                size={36}
                className={`font-bold cursor-pointer ${rate <= myRate ? 'text-yellow' : 'text-gray'}`}
              />
            </span>
          ))}
        </div>

        <AppTextArea
          isInvalid={reviewError != null}
          label='Review'
          placeholder='Escribe tu review aquí'
          errorMessage={reviewError ?? ''}
          onChangeText={setReview}
        />

        <span className='block mb-4' />

        <AppButton
          text='Agregar review'
          bgColor={theme.mainColor}
          color={colors.white}
          onPress={() => {
            handleAddReview()
          }}
        />
      </section>
    </AppContainer>
  )
}
