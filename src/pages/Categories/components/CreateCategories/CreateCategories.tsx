import { useState, memo, useMemo } from 'react'
import {
  Button,
  ButtonGroup,
  Flex,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { BiCategory } from 'react-icons/bi'
import { NavBar } from '../../../../components/NavBar'
import { ModalHeroDelete, ModalHeroUpdate } from '../../../../components/Modais'
import { FormCategoryHero, FormCategoryHeroUpdate } from '../FormCategoryHero'
import { HeroCategoryCard } from '../HeroCategoryCard'
import { useFetch } from '../../../../hooks/useFetch'
import { useCategories } from '../../hooks/useCategories'
import { ModalCreateCategory } from '../ModalCreateCategory'
import { ModalHeroCategory } from '../ModalHeroCategory'
import { Loading } from '../../../../components/Loading'

const CreateCategories = () => {
  const {
    name,
    category,
    isValid,
    loading,
    setName,
    handleCreateCategory,
    handleDeleteCategory,
    handleUpdatedCategory,
  } = useCategories()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [categoryPerPage] = useState<number>(10)
  const { product } = useFetch()
  const navBarToggle = useDisclosure()
  const toast = useToast()

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

  return (
    <>
      <NavBar
        label="Categorias de Produtos"
        title="Criar Categoria"
        onOpen={navBarToggle.onOpen}
        icon={BiCategory}
        isButton
      />

      {/* TODO: MODAL CREATE CATEGORY  */}
      <ModalCreateCategory
        onClose={navBarToggle.onClose}
        isOpen={navBarToggle.isOpen}
      >
        <FormCategoryHero
          onHandleSubmit={handleCreateCategory}
          onChange={e => setName(e.target.value)}
          onHandleClick={navBarToggle.onToggle}
        />
      </ModalCreateCategory>

      {/* TODO: List Categories */}
      {!loading ? (
        <VStack spacing={4} align={'stretch'}>
          {CATEGORY.map(props => (
            <HeroCategoryCard key={props.id} category={props}>
              <ButtonGroup spacing={2}>
                <ModalHeroCategory
                  products={props.products}
                  title={props.name}
                />

                <ModalHeroUpdate
                  title="Categoria"
                  category={props}
                  onHandleClick={() => handleUpdatedCategory(props.id)}
                  isValid={isValid}
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
                    handleDeleteCategory(props.id)
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
      ) : (
        <Loading />
      )}

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
