import type { User } from '.'

export interface ProductsPagination {
  current_page: number
  data: Product[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  seller_id: number
  updated_at?: string
  created_at?: string
  seller: User
  images: Image[]
  categories: Category[]
}

export interface Category {
  id: number
  name: string
  created_at?: string
  updated_at?: string
  laravel_through_key?: number
}

export interface Image {
  id: number
  link: string
  product_id: number
  created_at?: string
  updated_at?: string
}

export interface ImageUpload {
  image: string
}

export interface Link {
  url: null | string
  label: string
  active: boolean
}
