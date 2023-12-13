import { useEffect } from 'react'

import { Order } from '@/modules/orders/components'
import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks/use-navigate'
import { useTheme } from '@/modules/shared/store'
import { useSellerOrders } from '../hooks/use-seller-orders'

export default function OrdersScreen() {
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()
  const { orders } = useSellerOrders()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Mis pedidos'
        description='Los pedidos que la gente hizo de tus productos'
      />

      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {orders.map((order) => (
          <Order
            key={order.id}
            client={order.user}
            date={order.date}
            noOfProducts={order.products.length}
            total={order.total}
            status={order.status}
            isAdminOrder
            navToOrder={() => {
              navigate(`/admin-order/${order.id}`)
            }}
            navToClient={() => {
              navigate(`/user-profile/${order.user.id}`)
            }}
          />
        ))}
      </div>
    </AppContainer>
  )
}
