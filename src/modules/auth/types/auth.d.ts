export interface UserLogged {
  isLoggedIn: boolean
  user: User | null
  token: string | null
}

export interface User {
  name: string
  lastname: string
  email: string
  role: Role
  picture: string | null
  biography: string | null
}

export enum Role {
  Seller = 'seller',
  User = 'user',
  Admin = 'admin'
}
