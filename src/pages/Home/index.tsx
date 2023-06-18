import { useState, useEffect } from 'react'
import { Home } from './Home'
import { Loading } from '../../components/Loading'
import { SideBar } from '../../components/SideBar'

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
  }, [])

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
