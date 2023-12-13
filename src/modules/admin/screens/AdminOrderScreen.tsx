import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '@/modules/auth/store'
import { OrderResume } from '@/modules/orders/components'
import type { OrderStatus } from '@/modules/orders/types/order'
import { Product } from '@/modules/products/components'
import { AppContainer, AppHeader } from '@/modules/shared/components'
import type { AdminOrder } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { getSellerOrders } from '../services'

export default function AdminOrderScreen() {
  const { order: orderParam } = useParams()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const [order, setOrder] = useState<AdminOrder>()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    if (orderParam !== undefined) {
      getOrder(orderParam)
    }
  }, [orderParam])

  const getOrder = async (id: string) => {
    const adminOrders = await getSellerOrders(auth.token!)
    if (adminOrders == null) return

    const orderFound = adminOrders.find((order) => order.id === Number(id))

    if (orderFound !== undefined) {
      setOrder(orderFound)
    }
  }

  return (
    <AppContainer>
      <AppHeader
        title='Estado de la orden'
        description={`Resumen de (${order?.products.length ?? 0}) productos`}
      />

      <div className='flex flex-row items-start justify-between w-full gap-8'>
        <div className='w-1/4 mx-auto'>
          {(order != null && order !== undefined) && (
            <OrderResume
              address={order.address}
              status={order.status as OrderStatus}
              user={order.user}
              orderData={{
                noOfProducts: order.products.length ?? 0,
                subTotal: order.subtotal,
                tax: order.tax,
                total: order.total
              }}
            />
          )}
        </div>

        <div className='flex-1'>
          {(order != null && order !== undefined) && (
            <div className='grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {order.products.map((product) => (
                <Product
                  key={product.product.id}
                  product={product.product}
                  isAdmin
                  quantitySold={product.quantity_sold}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppContainer>
  )
}
