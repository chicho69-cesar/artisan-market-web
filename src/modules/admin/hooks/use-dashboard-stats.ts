import { useAuth } from '@/modules/auth/store'
import type { DashboardStats } from '@/modules/shared/interfaces'
import { useEffect, useState } from 'react'
import { getDashboardStats } from '../services'

export function useDashboardStats() {
  const auth = useAuth((state) => state)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState<DashboardStats>()

  useEffect(() => {
    setIsLoading(true)
    refetchStats()
    setIsLoading(false)
  }, [])

  const refetchStats = async () => {
    const dashboardStats = await getDashboardStats(auth.token!)

    if (dashboardStats != null) {
      setStats(dashboardStats)
    }
  }

  return {
    isLoading,
    stats,
    refetchStats
  }
}
