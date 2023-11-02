import { Navigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/store/auth'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function AlreadyAuthRoute({ children }: Props) {
  const auth = useAuth((state) => state)

  if (auth.isLoggedIn) {
    return <Navigate replace to='/home' />
  } else {
    return children
  }
}
