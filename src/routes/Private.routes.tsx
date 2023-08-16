import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthenticationContext } from '../contexts/authContextProvider'

const PrivateRoutes = () => {
  const { signedOnUser } = useContext(AuthenticationContext)

  // if (isLoadingUser) return <div />

  // return signedOnStorage ? <Outlet /> : <Navigate to="/" />
  return signedOnUser ? <Outlet /> : <Navigate to="/" />
}

export { PrivateRoutes }
