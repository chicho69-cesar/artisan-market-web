import type { Address, Product, User } from '.'

export interface Order {
  address_id: number
  address: Address
  created_at?: string
  date: string
  id: number
  order_products?: OrderProduct[]
  products: Product[]
  status: string
  subtotal: number
  tax: number
  total: number
  updated_at?: string
  user_id: number
  user: User
}

export interface AdminOrder {
  address_id: number
  address: Address
  created_at?: string
  date: string
  id: number
  products: AdminProduct[]
  status: string
  subtotal: number
  tax: number
  total: number
  updated_at?: string
  user_id: number
  user: User
}

export interface ProductElement {
  product: Product
  quantity_sold: number
}

export interface OrderProduct {
  id: number
  product_id: number
  order_id: number
  quantity: number
  created_at?: string
  updated_at?: string
}

export interface AdminProduct {
  product: Product
  quantity_sold: number
}
