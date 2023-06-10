import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthenticationContext } from '../contexts/authContextProvider'

const PrivateRoutes = () => {
  const { signedOnUser } = useContext(AuthenticationContext)

  return signedOnUser ? <Outlet /> : <Navigate to="/" />
}

export { PrivateRoutes }
