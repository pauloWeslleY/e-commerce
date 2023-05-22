import { Navigate } from 'react-router-dom'
import { useLoggedUser } from '../../hooks/useLoggedUser'
import { SignIn } from './SignIn'

export const Login = () => {
  const { userAuth } = useLoggedUser()

  return !userAuth ? <SignIn /> : <Navigate to="/dashboard" />
}
