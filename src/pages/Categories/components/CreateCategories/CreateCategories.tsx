import { useState, useEffect, FormEvent, memo, useMemo } from 'react'
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
import {
  Button,
  ButtonGroup,
  Flex,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { BiCategory } from 'react-icons/bi'
import { db } from '../../../../services/firebase'
import { CategoryType } from '../../../../types/CategoryType'
import { NavBar } from '../../../../components/NavBar'
import { FormCategoryHero, FormCategoryHeroUpdate } from '../FormCategoryHero'
import { HeroCategoryCard } from '../HeroCategoryCard'
import { ModalHeroDelete, ModalHeroUpdate } from '../../../../components/Modais'
import { cateCollectionRef } from '../../../../services/collections'
import { useFetch } from '../../../../hooks/useFetch'
import { ModalCreateCategory } from '../ModalCreateCategory'
import { ModalHeroCategory } from '../ModalHeroCategory'

function CreateCategories() {
  const [category, setCategory] = useState<CategoryType[]>([])
  const [name, setName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [categoryPerPage] = useState<number>(10)
  const { product } = useFetch()
  const navBarToggle = useDisclosure()
  const toast = useToast()

  const isCategory: CategoryType = {
    name,
  }

  const handleCreateCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = query(collection(db, 'category'), where('name', '==', name))
    const categorySnapshot = await getDocs(data)
    const isCategories = category.some(categories => categories.name === name)

    try {
      if (name.length === 0) {
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
    } catch (error) {
      console.log(error)
      toast({
        title: 'Falha ao cria categoria!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleUpdatedCategory = async (id: string) => {
    try {
      const categoryId = category.some(props => props.id === id)

      if (name.length === 0) {
        toast({
          title: 'Preencher os campos!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else if (categoryId && name.length !== 0) {
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
    } catch (error) {
      toast({
        title: 'Falha ao cadastrar categoria!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleDelete = async (id: string) => {
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
  }

  const categories = useMemo(() => {
    const data = category.map(category => {
      const prod = product.filter(item => item.categoryId === category.name)

      return {
        id: category.id,
        name: category.name,
        products: prod,
      }
    })

    return data
  }, [category, product])

  const lastIndex: number = currentPage * categoryPerPage
  const firstIndex: number = lastIndex - categoryPerPage
  const CATEGORY = categories.slice(firstIndex, lastIndex)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  useEffect(() => {
    filteredCategory()
  }, [])

  return (
    <>
      <NavBar
        label="Categorias de Produtos"
        title="Criar Categoria"
        onOpen={navBarToggle.onOpen}
        icon={BiCategory}
      />

      {/* TODO: MODAL CREATE CATEGORY  */}
      <ModalCreateCategory
        onClose={navBarToggle.onClose}
        isOpen={navBarToggle.isOpen}
      >
        <FormCategoryHero
          onHandleSubmit={handleCreateCategory}
          value={name}
          onChange={e => setName(e.target.value)}
          onHandleClick={navBarToggle.onToggle}
        />
      </ModalCreateCategory>

      {/* HACK: List Categories */}
      <VStack spacing={4} align={'stretch'}>
        {CATEGORY.map(props => (
          <HeroCategoryCard key={props.id} category={props}>
            <ButtonGroup spacing={2}>
              <ModalHeroCategory products={props.products} title={props.name} />

              <ModalHeroUpdate
                title="Categoria"
                category={props}
                onHandleClick={() => handleUpdatedCategory(props.id)}
              >
                <FormCategoryHeroUpdate
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </ModalHeroUpdate>

              <ModalHeroDelete
                title="Categoria"
                label="esta"
                items={props}
                onHandleDelete={() => {
                  handleDelete(props.id)
                  toast({
                    title: `Categoria com ID ${props.id} deletado`,
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                  })
                }}
              />
            </ButtonGroup>
          </HeroCategoryCard>
        ))}
      </VStack>

      <Flex mt={4} py={6} w={'full'} align={'center'} justify={'center'}>
        {Array.from({
          length: Math.ceil(categories.length / categoryPerPage),
        }).map((_, index) => (
          <Button
            key={index}
            mr={2}
            rounded={'xl'}
            variant={currentPage === index + 1 ? 'solid' : 'outline'}
            color={currentPage === index + 1 ? 'gray.700' : 'whiteAlpha.400'}
            bg={currentPage === index + 1 ? 'purple.600' : 'transparent'}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
    </>
  )
}

export default memo(CreateCategories)
