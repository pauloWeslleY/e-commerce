import { useContext } from 'react'
import { AuthenticationContext } from '../contexts/authContextProvider'

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext)

  return context
}
