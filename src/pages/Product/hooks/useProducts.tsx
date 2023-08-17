import { useContext } from 'react'
import { ProductsContext } from '../provider/providerProducts'

export const useProducts = () => {
  const context = useContext(ProductsContext)

  return context
}
