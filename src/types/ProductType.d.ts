import { Timestamp } from 'firebase/firestore'

type ProductsType = {
  id?: string
  name?: string
  description?: string
  price?: string
  categoryId?: string
  quantity?: string | number
  supplier?: string
  createAt?: Timestamp
  updateAt?: Timestamp
}

export { ProductsType }
