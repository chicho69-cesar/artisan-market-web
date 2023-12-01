import { useNavigate } from '@/modules/shared/hooks'
import type { Product as ProductType } from '@/modules/shared/interfaces'
import { Product } from '.'
import { useActiveProduct } from '../store'

interface Props {
  products: ProductType[]
  withoutNavigate?: boolean
  isForOrder?: boolean
}

export default function Products({ products, withoutNavigate = false, isForOrder = false }: Props) {
  const productState = useActiveProduct((state) => state)
  const { navigate } = useNavigate()

  return (
    <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isForOrder ? 'xl:grid-cols-3' : 'xl:grid-cols-4'} gap-5`}>
      {products.map((product) => (
        <Product
          product={product}
          key={product.id}
          onPress={() => {
            if (!withoutNavigate) {
              productState.setActiveProduct(product)
              navigate(`/details/${product.id}`)
            }
          }}
        />
      ))}
    </div>
  )
}
