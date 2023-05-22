import { useState, useEffect, FormEvent, memo } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  where,
  query,
  orderBy,
} from 'firebase/firestore'
import { useToast, useDisclosure } from '@chakra-ui/react'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { db } from '../../../../services/firebase'
import { useColors } from '../../../../hooks/useColors'
import { useLoading } from '../../../../hooks/useLoading'
import { ProductsType } from '../../../../types/ProductType'
import { NavBar } from '../../../../components/NavBar'
import { Loading } from '../../../../components/Loading'
import { DrawerHero } from '../../../../components/DrawerHero'
import { ModalHeroDelete, ModalHeroUpdate } from '../../../../components/Modais'
import {
  HeroTableColumn,
  HeroTableHeader,
  HeroTableProductItem,
  HeroTableWrapper,
} from '../TableProduct'
import {
  FormFooterHero,
  FormHeroBox,
  FormHeroProduct,
  FormStack,
} from '../HeroFormProduct'
import { createAndUpdateProduct } from '../../../../utils/createAndUpdateProduct'

function CreateProduct() {
  const [product, setProduct] = useState<ProductsType[]>([])
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [supplier, setSupplier] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)
  const prodCollectionRef = collection(db, 'product')
  const navBarToggle = useDisclosure()
  const toast = useToast()
  const { THEME } = useColors()
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
    const prodItem = product.some((prod) => prod.id === id)
    try {
      if (name.length === 0) {
        toast({
          title: 'Preencher os campos!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else if (prodItem && name.length !== 0) {
        const products = product.map((prod) =>
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
        title: 'Falha ao atualizar o produto!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.error(error)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'product', id))
    setProduct(product.filter((prod) => prod.id !== id))
  }

  const filteredProducts = async () => {
    const filteredProd = query(
      prodCollectionRef,
      where('name', '!=', true),
      orderBy('name', 'asc')
    )
    const querySnapshot = await getDocs(filteredProd)
    const allProducts = querySnapshot.docs.map<ProductsType>((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setProduct(allProducts)
  }

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
          <FormStack bg={THEME.DASHBOARD.FORM_BACKGROUND}>
            <FormHeroProduct
              valueName={name}
              valuePrice={price}
              valueDescription={description}
              valueSupplier={supplier}
              valueQuantity={quantity}
              valueCategoryId={categoryId}
              onHandleChangeName={(e) => setName(e.target.value)}
              onHandleChangePrice={(e) => setPrice(e.target.value)}
              onHandleChangeDescription={(e) => setDescription(e.target.value)}
              onHandleChangeSupplier={(e) => setSupplier(e.target.value)}
              onHandleChangeQuantity={(e) =>
                setQuantity(Number(e.target.value))
              }
              onHandleChangeCategoryId={(e) => setCategoryId(e.target.value)}
            />
          </FormStack>
          <FormFooterHero onHandleClick={navBarToggle.onToggle} />
        </FormHeroBox>
      </DrawerHero>

      <HeroTableProductItem>
        {product.map((props, i) => (
          <HeroTableWrapper key={`${props.id}${i}`}>
            <HeroTableHeader />
            <HeroTableColumn product={props}>
              <ModalHeroUpdate
                title="Produto"
                items={props}
                onHandleClick={() => handleUpdateProduct(props.id)}
              >
                <FormStack bg={THEME.DASHBOARD.POPOVER_BACKGROUND}>
                  <FormHeroProduct
                    valueName={name}
                    valuePrice={price}
                    valueDescription={description}
                    valueSupplier={supplier}
                    valueQuantity={quantity}
                    valueCategoryId={categoryId}
                    onHandleChangeName={(e) => setName(e.target.value)}
                    onHandleChangePrice={(e) => setPrice(e.target.value)}
                    onHandleChangeSupplier={(e) => setSupplier(e.target.value)}
                    onHandleChangeDescription={(e) =>
                      setDescription(e.target.value)
                    }
                    onHandleChangeQuantity={(e) =>
                      setQuantity(Number(e.target.value))
                    }
                    onHandleChangeCategoryId={(e) =>
                      setCategoryId(e.target.value)
                    }
                  />
                </FormStack>
              </ModalHeroUpdate>

              <ModalHeroDelete
                title="Item"
                items={props}
                onHandleDelete={() => {
                  handleDelete(props.id)
                  toast({
                    title: `Item ${props.name} deletado`,
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                  })
                }}
              />
            </HeroTableColumn>
          </HeroTableWrapper>
        ))}
      </HeroTableProductItem>
    </>
  )
}

export default memo(CreateProduct)
