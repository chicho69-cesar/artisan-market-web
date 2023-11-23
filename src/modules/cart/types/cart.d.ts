import type { Product } from '@/modules/shared/interfaces/product'

export interface Cart {
  product: Product
  quantity: number
}

export interface CartOrderData {
  noOfProducts: number
  subTotal: number
  tax: number
  total: number
}
