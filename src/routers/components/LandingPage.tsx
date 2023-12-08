import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useFeaturedProducts } from '@/modules/products/hooks/use-featured-products'
import { Products } from '@/modules/products/components'

export default function LandingPage() {
  const { products } = useFeaturedProducts()

  return (
    <AppContainer>
      <AppHeader
        title='Artisan Market'
        description='Productos mas recientes'
      />

      <Products products={products} />
    </AppContainer>
  )
}
