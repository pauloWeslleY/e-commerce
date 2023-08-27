import {
  FormEvent,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useToast } from '@chakra-ui/react'
import { db } from '../../../../firebase'
import { prodCollectionRef } from '../../../services/collections'
import { createAndUpdateProduct } from '../../../utils/createAndUpdateProduct'
import { ProductsType } from '../../../types/ProductType'

type ProductsContextProps = {
  product: ProductsType[]
  name: string
  price: string | number
  description: string
  supplier: string
  quantity: number
  categoryId: string
  loading: boolean
  isValid: boolean
  isFormValid: () => void
  handleCreateProduct: (event: FormEvent<HTMLFormElement>) => Promise<void>
  handleUpdateProduct: (id: string) => Promise<void>
  handleDeleteProduct: (id: string) => Promise<void>
  handleConvertNumber: (props: string) => void
  handleConvertPrice: (price: string) => void
  setName: React.Dispatch<React.SetStateAction<string>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  setSupplier: React.Dispatch<React.SetStateAction<string>>
  setCategoryId: React.Dispatch<React.SetStateAction<string>>
}

type ProductsProvider = {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContextProps)

export const ProductsProvider = ({ children }: ProductsProvider) => {
  const [product, setProduct] = useState<ProductsType[]>([])
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number | string>()
  const [description, setDescription] = useState<string>('')
  const [supplier, setSupplier] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [quantity, setQuantity] = useState<number>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isValid, setIsValid] = useState<boolean>(false)
  const toast = useToast()

  const { createProduct, updateProduct } = createAndUpdateProduct({
    name,
    description,
    price,
    categoryId,
    supplier,
    quantity,
  })

  const isFormValid = () => {
    if (
      name !== '' &&
      description !== '' &&
      price !== '' &&
      categoryId !== '' &&
      supplier !== '' &&
      quantity !== 0
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const handleCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = query(collection(db, 'product'), where('name', '==', name))
    const productSnapshot = await getDocs(data)

    if (name.length === 0) {
      toast({
        title: 'Preencha os campos!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (productSnapshot.empty && isValid) {
      const docRef = await addDoc(prodCollectionRef, createProduct)
      setProduct([...product, { id: docRef.id, ...createProduct }])
      setName('')
      setPrice('')
      setDescription('')
      setCategoryId('')
      setSupplier('')
      setQuantity(0)
      toast({
        title: 'Produto Cadastrado!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Produto já cadastrado!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleUpdateProduct = async (id: string) => {
    const prodItem = product.some(prod => prod.id === id)

    if (name.length === 0) {
      toast({
        title: 'Preencher os campos!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (prodItem && name.length !== 0) {
      const products = product.map(prod =>
        prod.id === id ? { id, ...updateProduct } : prod
      )
      await updateDoc(doc(db, 'items', id), updateProduct)
      setProduct(products)
      setName('')
      setPrice('')
      setDescription('')
      setCategoryId('')
      setSupplier('')
      setQuantity(0)
      toast({
        title: 'Produto Atualizado!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Produto já atualizado!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'product', id))
    setProduct(product.filter(prod => prod.id !== id))
  }

  const filteredProducts = async () => {
    const filteredProd = query(
      prodCollectionRef,
      where('name', '!=', true),
      orderBy('name', 'asc')
    )
    const prodSnapshot = await getDocs(filteredProd)
    const allProducts = prodSnapshot.docs.map<ProductsType>(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    setProduct(allProducts)
    setLoading(false)
  }

  const handleConvertNumber = useCallback((props: string) => {
    try {
      const parseNumber = Number(props)
      setQuantity(parseNumber)
    } catch (error) {
      throw new Error(`Invalid value, must be a number ${error}`)
    }
  }, [])

  const handleConvertPrice = useCallback((price: string) => {
    try {
      const parseNumber = Number(price)
      setPrice(parseNumber)
    } catch (error) {
      throw new Error(`Invalid value, must be a number ${error}`)
    }
  }, [])

  useEffect(() => {
    filteredProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        product,
        name,
        price,
        quantity,
        description,
        categoryId,
        supplier,
        loading,
        isValid,
        isFormValid,
        handleCreateProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        handleConvertNumber,
        handleConvertPrice,
        setName,
        setDescription,
        setCategoryId,
        setSupplier,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
