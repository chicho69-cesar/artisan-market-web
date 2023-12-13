import { useEffect } from 'react'

import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { Order } from '../components'
import { useOrdersHistory } from '../hooks'

export default function OrdersHistoryScreen() {
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()
  const { orders } = useOrdersHistory()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Mis compras'
        description='Historial de mis compras'
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
            navToOrder={() => {
              navigate(`/order/${order.id}`)
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
