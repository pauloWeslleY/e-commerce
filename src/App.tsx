import { Outlet } from 'react-router-dom'
import { useLoggedUser } from './hooks/useLoggedUser'
import { AuthenticationProvider } from './contexts/authContextProvider'

export function App() {
  const { isLoadingLoggedUser } = useLoggedUser()

  return (
    !isLoadingLoggedUser && (
      <AuthenticationProvider>
        <Outlet />
      </AuthenticationProvider>
    )
  )
}
