import { Timestamp } from 'firebase/firestore'
import { ProductsType } from '../types/ProductType'
import { currentDay } from './convertTimestampToDayjs'

const createdAtTimestamp = Timestamp.fromDate(currentDay)
const updatedAtTimestamp = Timestamp.fromDate(currentDay)

const createAndUpdateProduct = ({
  name,
  description,
  price,
  categoryId,
  quantity,
  supplier,
  createAt = createdAtTimestamp,
  updateAt = updatedAtTimestamp,
}: ProductsType) => {
  const createProduct: ProductsType = {
    name,
    description,
    price,
    categoryId,
    quantity,
    supplier,
    createAt,
  }

  const updateProduct: ProductsType = {
    name,
    description,
    price,
    categoryId,
    quantity,
    supplier,
    updateAt,
  }

  return {
    createProduct,
    updateProduct,
  }
}

export { createAndUpdateProduct }
