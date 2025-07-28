import { useAuth } from '@/modules/auth/store/auth'
import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export default function ProtectedRoute({ children }: Props) {
  const auth = useAuth((state) => state)

  if (auth.isLoggedIn) {
    return <>{children}</>
  } else {
    return <Navigate replace to='/sign-in' />
  }
}
