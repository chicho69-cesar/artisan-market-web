export interface Auth {
  token: string
  user: User
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: null
  created_at?: string
  updated_at?: string
  role_id: number
  lastname: string
  picture?: string | null
  biography?: string | null
}

export interface UserInfo {
  id: number
  name: string
  lastname: string
  picture: string | null
  email: string
}

export interface Follow {
  id: number
  follower_id: number
  following_id: number
  created_at?: string
  updated_at?: string
}

export interface PictureUpload {
  picture: string
}

export interface Conversation {
  send: Message[]
  receive: Message[]
}

export interface Message {
  id: number
  user_send_id: number
  user_receive_id: number
  message: string
  date: string
  updated_at?: string
  created_at?: string
}

export enum Roles {
  seller = 1,
  user = 2,
  admin = 3
}
