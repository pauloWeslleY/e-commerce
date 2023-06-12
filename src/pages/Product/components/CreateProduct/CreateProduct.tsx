import { useState, useEffect, FormEvent, memo, useMemo } from 'react'
import {
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  where,
  query,
  orderBy,
  collection,
} from 'firebase/firestore'
import { prodCollectionRef } from '../../../../services/collections'
import { db } from '../../../../services/firebase'
import { useToast, useDisclosure } from '@chakra-ui/react'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { createAndUpdateProduct } from '../../../../utils/createAndUpdateProduct'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { useLoading } from '../../../../hooks/useLoading'
import { ProductsType } from '../../../../types/ProductType'
import { NavBar } from '../../../../components/NavBar'
import { Loading } from '../../../../components/Loading'
import { DrawerHero } from '../../../../components/DrawerHero'
import { ModalHeroDelete, ModalHeroUpdate } from '../../../../components/Modais'
import { convertTimestampToDayjs } from '../../../../utils/convertTimestampToDayjs'
import { formatValueCurrency } from '../../../../utils/formatValueCurrency'
import { formatValueQuantity } from '../../../../utils/formatQuantityValue'
import { HeroTable, HeroTableRow } from '../HeroTableProduct'
import {
  FormFooterHero,
  FormHeroBox,
  FormHeroProduct,
} from '../HeroFormProduct'

const CreateProduct = () => {
  const [product, setProduct] = useState<ProductsType[]>([])
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<string | number>('')
  const [description, setDescription] = useState<string>('')
  const [supplier, setSupplier] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)
  const navBarToggle = useDisclosure()
  const toast = useToast()
  const { THEME } = useThemeColors()
  const { isLoading } = useLoading()
  const { createProduct, updateProduct } = createAndUpdateProduct({
    name,
    description,
    price,
    categoryId,
    supplier,
    quantity,
  })

  const handleCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = query(collection(db, 'product'), where('name', '==', name))
    const querySnapshot = await getDocs(data)

    try {
      if (name.length === 0) {
        toast({
          title: 'Preencha os campos!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else if (querySnapshot.empty) {
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
    } catch (error) {
      toast({
        title: 'Não foi possível cadastrar este produto!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.log(error)
    }
  }

  const handleUpdateProduct = async (id: string) => {
    const prodItem = product.some(prod => prod.id === id)
    try {
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
    } catch (error) {
      toast({
        title: `Falha ao atualizar o produto! ${error.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'product', id))
    setProduct(product.filter(prod => prod.id !== id))
  }

  const filteredProducts = async () => {
    const filteredProd = query(
      prodCollectionRef,
      where('name', '!=', true),
      orderBy('name', 'asc')
    )
    const querySnapshot = await getDocs(filteredProd)
    const allProducts = querySnapshot.docs.map<ProductsType>(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    setProduct(allProducts)
  }

  const handleQuantity = (quantity: string) => {
    try {
      const parseQuantity = Number(quantity)
      setQuantity(parseQuantity)
    } catch (error) {
      console.error('Invalid Quantity value')
      throw new Error(error)
    }
  }

  const allProductsFormat = useMemo(() => {
    const response = product.map(product => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: formatValueCurrency(Number(product.price)),
        quantity: formatValueQuantity(Number(product.quantity)),
        categoryId: product.categoryId,
        supplier: product.supplier,
        createdAt: convertTimestampToDayjs(product.createAt),
        updatedAt: convertTimestampToDayjs(product.updateAt),
      }
    })

    return response
  }, [product])

  useEffect(() => {
    filteredProducts()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <NavBar
        label="Tabela de Produtos"
        title="Criar Produto"
        onOpen={navBarToggle.onOpen}
        icon={HiOutlineShoppingBag}
      />

      <DrawerHero isOpen={navBarToggle.isOpen} onClose={navBarToggle.onClose}>
        <FormHeroBox onHandleSubmit={handleCreateProduct}>
          <FormHeroProduct
            bg={THEME.DASHBOARD.FORM_BACKGROUND}
            valueName={name}
            valuePrice={price}
            valueDescription={description}
            valueSupplier={supplier}
            valueQuantity={quantity}
            valueCategoryId={categoryId}
            onHandleChangeName={e => setName(e.target.value)}
            onHandleChangePrice={e => setPrice(e.target.value)}
            onHandleChangeDescription={e => setDescription(e.target.value)}
            onHandleChangeSupplier={e => setSupplier(e.target.value)}
            onHandleChangeQuantity={e => handleQuantity(e.target.value)}
            onHandleChangeCategoryId={e => setCategoryId(e.target.value)}
          />
          <FormFooterHero onHandleClick={navBarToggle.onToggle} />
        </FormHeroBox>
      </DrawerHero>

      <HeroTable bg={THEME.DASHBOARD.TABLE_PRODUCT_HEADER_BG}>
        {allProductsFormat.map(product => (
          <HeroTableRow key={product.id} product={product}>
            <ModalHeroUpdate
              title="Produto"
              items={product}
              onHandleClick={() => handleUpdateProduct(product.id)}
            >
              <FormHeroProduct
                bg={THEME.DASHBOARD.POPOVER_BACKGROUND}
                valueName={name}
                valuePrice={price}
                valueDescription={description}
                valueSupplier={supplier}
                valueQuantity={quantity}
                valueCategoryId={categoryId}
                onHandleChangeName={e => setName(e.target.value)}
                onHandleChangePrice={e => setPrice(e.target.value)}
                onHandleChangeSupplier={e => setSupplier(e.target.value)}
                onHandleChangeDescription={e => setDescription(e.target.value)}
                onHandleChangeQuantity={e => handleQuantity(e.target.value)}
                onHandleChangeCategoryId={e => setCategoryId(e.target.value)}
              />
            </ModalHeroUpdate>

            <ModalHeroDelete
              title="Produto"
              label="este"
              items={product}
              onHandleDelete={() => {
                handleDelete(product.id)
                toast({
                  title: `Item ${product.name} deletado`,
                  status: 'success',
                  duration: 10000,
                  isClosable: true,
                })
              }}
            />
          </HeroTableRow>
        ))}
      </HeroTable>
    </>
  )
}

export default memo(CreateProduct)
