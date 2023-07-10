import { useContext } from 'react'
import { CategoriesContext } from '../provider/ categoriesProvider'

export const useCategories = () => {
  const context = useContext(CategoriesContext)

  return context
}
