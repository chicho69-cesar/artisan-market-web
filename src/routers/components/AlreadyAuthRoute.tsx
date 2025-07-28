import { useAuth } from '@/modules/auth/store/auth'
import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export default function AlreadyAuthRoute({ children }: Props) {
  const auth = useAuth((state) => state)

  if (auth.isLoggedIn) {
    return <Navigate replace to='/home' />
  } else {
    return children
  }
}
