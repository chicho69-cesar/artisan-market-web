import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useTheme } from '@/modules/shared/store'
import { Products } from '../components'
import { useProducts } from '../hooks'

export default function SearchScreen() {
  const theme = useTheme((state) => state)
  const { products, searchProducts } = useProducts()
  const [url] = useSearchParams()
  const query = url.get('q')

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    if (query != null) {
      searchProducts(query)
    }
  }, [query])

  return (
    <AppContainer>
      <AppHeader
        title='Resultados de la búsqueda'
        description={`Resultados de buscar ${query}`}
      />

      <Products products={products} />
    </AppContainer>
  )
}
