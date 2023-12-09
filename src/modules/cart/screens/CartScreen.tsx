import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { CartResume, ProductCart } from '../components'
import { useCartData } from '../hooks'
import { useCart } from '../store'

export default function CartScreen() {
  const theme = useTheme((state) => state)
  const cart = useCart((state) => state)
  const { navigate } = useNavigate()
  const { orderData } = useCartData()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Carrito de compras'
        description='Productos del carrito de compras'
      />

      <div className='flex flex-row items-start justify-between gap-8'>
        <section className='w-2/3'>
          {cart.cart.map(({ product, quantity }) => (
            <ProductCart
              key={product.id}
              product={product}
              quantity={quantity}
              decreaseQuantity={() => {
                cart.decreaseQuantity(product.id)
              }}
              increaseQuantity={() => {
                cart.increaseQuantity(product.id)
              }}
              removeProduct={() => {
                cart.removeProductFromCart(product)
              }}
            />
          ))}

          {cart.cart.length === 0 && (
            <>
              <h2 className='text-3xl font-semibold text-gray'>
                No hay productos en el carrito
              </h2>

              <Link to='/home' className='font-medium text-gray'>
                Regresa al inicio para comprar
              </Link>
            </>
          )}
        </section>

        <section className='w-1/3'>
          <CartResume
            noOfProducts={orderData.noOfProducts}
            subTotal={orderData.subTotal}
            tax={orderData.tax}
            total={orderData.total}
            onPress={() => {
              if (cart.cart.length > 0) {
                navigate('/address')
              }
            }}
          />
        </section>
      </div>
    </AppContainer>
  )
}
