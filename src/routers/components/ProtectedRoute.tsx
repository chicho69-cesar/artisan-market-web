import { Navigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/store/auth'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function ProtectedRoute({ children }: Props) {
  const auth = useAuth((state) => state)

  if (auth.isLoggedIn) {
    return children
  } else {
    return <Navigate replace to='/sign-in' />
  }
}
