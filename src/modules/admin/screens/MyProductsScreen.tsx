import { useEffect } from 'react'

import { AppButton, AppContainer, AppHeader } from '@/modules/shared/components'
import { useAuth } from '@/modules/auth/store'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { AdminProduct } from '../components'
import { useAdminProducts } from '../hooks'

export default function MyProductsScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const { products } = useAdminProducts(auth.user!.id)
  const { navigate } = useNavigate()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Mis productos'
        description='Los productos que estoy vendiendo'
      />

      <AppButton
        text='Agregar producto'
        bgColor={theme.mainColor}
        color={colors.white}
        onPress={() => {
          navigate('/create-product')
        }}
      />

      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <AdminProduct
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </AppContainer>
  )
}
