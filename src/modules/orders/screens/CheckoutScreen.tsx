import { useEffect, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { useCartData } from '@/modules/cart/hooks'
import { useCart } from '@/modules/cart/store'
import { Products } from '@/modules/products/components'
import { AppAlert, AppContainer, AppHeader } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { OrderResume } from '../components'
import { createOrder } from '../services'
import { useAddress } from '../store'
import { OrderStatus } from '../types/order.d'
import type { ProductParam } from '../types/params.d'

export default function CheckoutScreen() {
  const theme = useTheme((state) => state)
  const { user, token } = useAuth((state) => state)
  const address = useAddress((state) => state.address)
  const { cart, resetCart } = useCart((state) => state)
  const { orderData } = useCartData()
  const { navigate } = useNavigate()

  const [isAnError, setIsAnError] = useState(false)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleConfirmOrder = async () => {
    const productsParams: ProductParam[] = cart.map((cartElement) => ({
      id: cartElement.product.id,
      quantity: cartElement.quantity
    }))

    const orderConfirmed = await createOrder(address!.id, productsParams, token!)

    if (orderConfirmed == null) {
      setIsAnError(true)
    } else {
      resetCart()
      navigate(`/order/${orderConfirmed.id}`)
    }
  }

  return (
    <AppContainer>
      <AppAlert
        alertIsOpen={isAnError}
        setAlertIsOpen={setIsAnError}
        description='Error al confirmar el pedido'
        title='Error!'
      />

      <AppHeader
        title='Resumen del pedido'
        description={`Resumen de (${orderData.noOfProducts}) productos`}
      />

      <div className='flex flex-row items-start justify-between w-full gap-8'>
        <div className='w-1/4 mx-auto'>
          <OrderResume
            user={user!}
            address={address!}
            orderData={orderData}
            status={OrderStatus.unconfirmed}
            confirmOrder={() => {
              handleConfirmOrder()
            }}
          />
        </div>

        <div className='flex-1'>
          <Products
            withoutNavigate
            isForOrder
            products={cart.map((cartElement) => cartElement.product)}
          />
        </div>
      </div>
    </AppContainer>
  )
}
