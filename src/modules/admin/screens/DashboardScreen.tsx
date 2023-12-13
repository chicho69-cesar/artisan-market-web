import { useEffect } from 'react'

import { AppContainer, AppHeader } from '@/modules/shared/components'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { DashboardCard } from '../components'
import { useDashboardStats } from '../hooks'

export default function DashboardScreen() {
  const theme = useTheme((state) => state)
  const { stats } = useDashboardStats()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Administra tu negocio'
        description='Ve las estadísticas de tu negocio'
      />

      <div className='flex flex-row flex-wrap gap-4'>
        <DashboardCard
          quantity={stats?.stats.total_orders ?? 0}
          color={colors.purple}
          icon='credit'
          text='Ordenes Totales'
        />

        <DashboardCard
          quantity={stats?.stats.paid_orders ?? 0}
          color={colors.green}
          icon='bill'
          text='Ordenes Pagadas'
        />

        <DashboardCard
          quantity={stats?.stats.pending_orders ?? 0}
          color={colors.lightGray}
          icon='user'
          text='Ordenes Pendientes'
        />

        <DashboardCard
          quantity={stats?.stats.cancelled_orders ?? 0}
          color={colors.red}
          icon='credit-off'
          text='Ordenes Canceladas'
        />

        <DashboardCard
          quantity={stats?.stats.total_products ?? 0}
          color={colors.yellow}
          icon='store'
          text='Productos'
        />

        <DashboardCard
          quantity={stats?.stats.zero_stock_products ?? 0}
          color={colors.black}
          icon='cancel'
          text='Sin Existencias'
        />

        <DashboardCard
          quantity={stats?.stats.total_reviews ?? 0}
          color={colors.blue}
          icon='pencil'
          text='Reviews'
        />
      </div>
    </AppContainer>
  )
}
