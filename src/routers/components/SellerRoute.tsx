import { Navigate } from 'react-router-dom'

import { useAuth } from '@/modules/auth/store/auth'
import { Role } from '@/modules/auth/types/auth.d'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function SellerRoute({ children }: Props) {
  const auth = useAuth((state) => state)

  if (auth.isLoggedIn && auth.user?.role === Role.Seller) {
    return children
  } else {
    return <Navigate replace to='/home' />
  }
}
