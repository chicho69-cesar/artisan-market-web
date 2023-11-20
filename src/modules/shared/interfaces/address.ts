export interface Address {
  id: number
  street: string
  no_out: string
  no_in?: string | null
  zip_code: string
  city: string
  state: string
  country: string
  phone: string
  created_at?: string
  updated_at?: string
}
