import { FormEvent, ReactNode, createContext, useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
} from 'firebase/firestore'
import { cateCollectionRef } from '../../../services/collections'
import { db } from '../../../../firebase'
import { CategoryType } from '../../../types/CategoryType'

type CategoriesProviderProps = {
  name: string
  category: CategoryType[]
  isValid: boolean
  loading: boolean
  isFormValid: () => void
  setCategory: React.Dispatch<React.SetStateAction<CategoryType[]>>
  setName: React.Dispatch<React.SetStateAction<string>>
  handleCreateCategory: (event: FormEvent<HTMLFormElement>) => Promise<void>
  handleUpdatedCategory: (id: string) => Promise<void>
  handleDeleteCategory: (id: string) => Promise<void>
}

type CategoriesProvider = {
  children: ReactNode
}

export const CategoriesContext = createContext({} as CategoriesProviderProps)

export const CategoriesProvider = ({ children }: CategoriesProvider) => {
  const [category, setCategory] = useState<CategoryType[]>([])
  const [name, setName] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const toast = useToast()

  const isFormValid = () => {
    if (name !== '') {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const isCategory: CategoryType = {
    name,
  }

  const handleCreateCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = query(collection(db, 'category'), where('name', '==', name))
    const categorySnapshot = await getDocs(data)
    const isCategories = category.some(categories => categories.name === name)

    if (name.trim() === '') {
      toast({
        title: 'Preencha os campos!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (categorySnapshot.empty && !isCategories) {
      const docRef = await addDoc(cateCollectionRef, isCategory)
      setCategory([...category, { id: docRef.id, ...isCategory }])
      setName('')
      toast({
        title: 'Categoria Cadastrada!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Essa Categoria já existe!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleUpdatedCategory = async (id: string) => {
    const categoryId = category.some(props => props.id === id)

    if (name.trim() === '') {
      toast({
        title: 'Preencher os campos!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (categoryId && name.trim() === '') {
      const categories = category.map(category =>
        category.id === id ? { id, ...isCategory } : category
      )
      await updateDoc(doc(db, 'categories', id), isCategory)
      setCategory(categories)
      setName('')
      toast({
        title: 'Categoria Atualizada!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Categoria já atualizada!',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleDeleteCategory = async (id: string) => {
    await deleteDoc(doc(db, 'categories', id))
    setCategory(category.filter(item => item.id !== id))
  }

  const filteredCategory = async () => {
    const filteredCategories = query(
      cateCollectionRef,
      where('name', '!=', true),
      orderBy('name', 'asc')
    )
    const querySnapshot = await getDocs(filteredCategories)
    const isCategory = querySnapshot.docs.map<CategoryType>(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    setCategory(isCategory)
    setLoading(false)
  }

  useEffect(() => {
    filteredCategory()
  }, [])

  return (
    <CategoriesContext.Provider
      value={{
        name,
        category,
        isValid,
        loading,
        isFormValid,
        setName,
        setCategory,
        handleCreateCategory,
        handleDeleteCategory,
        handleUpdatedCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}
