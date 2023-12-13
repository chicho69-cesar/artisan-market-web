import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '@/modules/auth/store'
import { Products } from '@/modules/products/components'
import { AppAlert, AppContainer, AppHeader } from '@/modules/shared/components'
import type { Order } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { OrderResume } from '../components'
import { cancelOrder, getOrderById, payOrder } from '../services'
import type { OrderStatus } from '../types/order.d'

export default function OrderScreen() {
  const { order: orderParam } = useParams()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const [order, setOrder] = useState<Order>()
  const [isAnError, setIsAnError] = useState(false)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    if (orderParam !== undefined) {
      getOrder(orderParam)
    }
  }, [orderParam])

  const getOrder = async (id: string) => {
    const orderFound = await getOrderById(Number(id), auth.token!)

    if (orderFound != null) {
      setOrder(orderFound)
    }
  }

  const handleOrderAction = async (pay: boolean) => {
    if (order == null || order === undefined) return

    const response = pay
      ? await payOrder(order.id, auth.token!)
      : await cancelOrder(order.id, auth.token!)

    if (response != null) {
      setOrder(response)
    } else {
      setIsAnError(true)
    }
  }

  return (
    <AppContainer>
      <AppAlert
        alertIsOpen={isAnError}
        setAlertIsOpen={setIsAnError}
        description='Ocurrió un error inesperado. Inténtalo de nuevo'
        title='Error!'
      />

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
              payOrder={() => {
                handleOrderAction(true)
              }}
              cancelOrder={() => {
                handleOrderAction(false)
              }}
            />
          )}
        </div>

        <div className='flex-1'>
          {(order != null && order !== undefined) && (
            <Products
              withoutNavigate
              isForOrder
              products={
                order.products ?? []
              }
            />
          )}
        </div>
      </div>
    </AppContainer>
  )
}
