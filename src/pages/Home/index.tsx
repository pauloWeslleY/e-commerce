import { useContext } from 'react'
import { AuthenticationContext } from '../../contexts/authContextProvider'
import { Home } from './Home'
import { Loading } from '../../components/Loading'
import { SideBar } from '../../components/SideBar'

export const HomePage = () => {
  const { isLoading } = useContext(AuthenticationContext)

  return !isLoading !== true ? (
    <SideBar>
      <Home />
    </SideBar>
  ) : (
    <SideBar>
      <Loading />
    </SideBar>
  )
}
