import type { User } from '.'

export interface Review {
  id: number
  product_id: number
  user_id: number
  rate: number
  comment: string
  created_at?: string
  updated_at?: string
  user: User
}
