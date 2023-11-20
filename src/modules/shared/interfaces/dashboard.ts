export interface DashboardStats {
  stats: Stats
}

export interface Stats {
  total_orders: number
  paid_orders: number
  pending_orders: number
  cancelled_orders: number
  total_products: number
  zero_stock_products: number
  total_reviews: number
}
