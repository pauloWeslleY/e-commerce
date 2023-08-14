import { useContext } from 'react'
import { AuthenticationContext } from '../../contexts/authContextProvider'
import { Home } from './Home'
import { SideBar } from '../../components/SideBar'
import { Loading } from '../../components/Loading'

export const HomePage = () => {
  const { isLoading } = useContext(AuthenticationContext)

  return isLoading ? (
    <SideBar>
      <Home />
    </SideBar>
  ) : (
    <SideBar>
      <Loading />
    </SideBar>
  )
}
