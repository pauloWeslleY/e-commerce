import { ProductsType } from './ProductType'

interface CategoriesProps {
  id: string
  name: string
  products?: ProductsType[]
}

export { CategoriesProps }
