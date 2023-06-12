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
  Flex,
  VStack,
  Collapse,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { BiCategory } from 'react-icons/bi'
import { db } from '../../../../services/firebase'
import { CategoryType } from '../../../../types/CategoryType'
import { NavBar } from '../../../../components/NavBar'
import { FormCategoryHero, FormCategoryHeroUpdate } from '../FormCategoryHero'
import { HeroCategoryContainer } from '../HeroCategoryContainer'
import { ModalHeroDelete, ModalHeroUpdate } from '../../../../components/Modais'
import { cateCollectionRef } from '../../../../services/collections'

function CreateCategories() {
  const [category, setCategory] = useState<CategoryType[]>([])
  const [name, setName] = useState<string>('')
  const navBarToggle = useDisclosure()
  const toast = useToast()

  const isCategory: CategoryType = {
    name,
  }

  const handleCreateCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const data = query(collection(db, 'category'), where('name', '==', name))
      const querySnapshot = await getDocs(data)

      if (name.length === 0) {
        toast({
          title: 'Preencha os campos!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else if (querySnapshot.empty) {
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
      return {
        id: category.id,
        name: category.name,
      }
    })

    return data
  }, [category])

  useEffect(() => {
    filteredCategory()
  }, [])

  return (
    <>
      <NavBar
        label="Categorias de Produtos"
        title="Criar Categoria"
        onOpen={navBarToggle.onToggle}
        icon={BiCategory}
      />

      {/* NOTE: Category creation form */}
      <Collapse in={navBarToggle.isOpen} animateOpacity>
        <FormCategoryHero
          onHandleSubmit={handleCreateCategory}
          value={name}
          onChange={e => setName(e.target.value)}
          onHandleClick={navBarToggle.onToggle}
        />
      </Collapse>

      {/* HACK: List Categories */}
      <VStack spacing={4} align={'stretch'}>
        {categories.map(props => (
          <HeroCategoryContainer key={props.id} category={props}>
            <Flex gap={2}>
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
            </Flex>
          </HeroCategoryContainer>
        ))}
      </VStack>
    </>
  )
}

export default memo(CreateCategories)
