import { Navigate } from 'react-router-dom'

import { useAuth } from '@/modules/auth/store/auth'
import { Roles } from '@/modules/shared/interfaces'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function SellerRoute({ children }: Props) {
  const auth = useAuth((state) => state)

  if (auth.isLoggedIn && auth.user?.role_id === Roles.seller) {
    return children
  } else {
    return <Navigate replace to='/home' />
  }
}
