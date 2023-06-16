import { Home } from './Home'
import { Loading } from '../../components/Loading'
import { useLoading } from '../../hooks/useLoading'

export const HomePage = () => {
  const { isLoading } = useLoading()

  return isLoading ? <Loading /> : <Home />
}
