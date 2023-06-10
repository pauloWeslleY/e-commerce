import { useEffect, useState } from 'react'
import { getDocs, orderBy, query, where } from 'firebase/firestore'
import { ProductsType } from '../types/ProductType'
import { CategoryType } from '../types/CategoryType'
import { UserType } from '../types/UsersType'
import {
  cateCollectionRef,
  prodCollectionRef,
  usersCollectionRef,
} from '../services/collections'

export function useFetch() {
  const [product, setProduct] = useState<ProductsType[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [isCategories, setIsCategories] = useState<CategoryType[]>([])
  const [users, setUsers] = useState<UserType[]>([])

  const getUsers = async () => {
    const dataUser = await getDocs(usersCollectionRef)
    const users = dataUser.docs.map<UserType>((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    setUsers(users)
  }

  const getCategories = async () => {
    const data = await getDocs(cateCollectionRef)
    const category = data.docs.map<CategoryType>((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setCategories(category)
  }

  const getProduct = async () => {
    const filteredProduct = query(
      prodCollectionRef,
      where('name', '!=', true),
      orderBy('name', 'asc')
    )
    const querySnapshot = await getDocs(filteredProduct)
    const isProduct = querySnapshot.docs.map<ProductsType>((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setProduct(isProduct)
  }

  const filteredCategory = async () => {
    const filteredCategories = query(
      cateCollectionRef,
      where('name', '!=', true),
      orderBy('name', 'asc')
    )
    const querySnapshot = await getDocs(filteredCategories)
    const isCategory = querySnapshot.docs.map<CategoryType>((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setIsCategories(isCategory)
  }

  useEffect(() => {
    getCategories()
    getProduct()
    getUsers()
    filteredCategory()
  }, [])

  return {
    product,
    categories,
    users,
    isCategories,
  }
}
