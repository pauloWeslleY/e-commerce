import { useState, memo, useMemo } from 'react'
import { useToast, Button, Flex } from '@chakra-ui/react'
import { useProducts } from '../../hooks/useProducts'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { Loading } from '../../../../components/Loading'
import { ModalHeroDelete, ModalHeroUpdate } from '../../../../components/Modais'
import { convertTimestampToDayjs } from '../../../../utils/convertTimestampToDayjs'
import { formatValueCurrency } from '../../../../utils/formatValueCurrency'
import { formatValueQuantity } from '../../../../utils/formatQuantityValue'
import { HeroTable, HeroTableRow } from '../HeroTableProduct'
import { FormHeroProduct } from '../HeroFormProduct'

const CreateProductHero = () => {
  const {
    supplier,
    categoryId,
    description,
    name,
    price,
    quantity,
    loading,
    product,
    setCategoryId,
    setDescription,
    setName,
    setSupplier,
    handleConvertNumber,
    handleConvertPrice,
    handleDeleteProduct,
    handleUpdateProduct,
  } = useProducts()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [productsPerPage] = useState<number>(10)
  const toast = useToast()
  const { THEME } = useThemeColors()

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

  /**
   * !Função para calcular o índice do último produto da página atual
   * Função para calcular o índice do primeiro produto da página atual
   * Função para obter os produtos da página atual
   */
  const lastIndex: number = currentPage * productsPerPage
  const firstIndex: number = lastIndex - productsPerPage
  const PRODUCTS = allProductsFormat.slice(firstIndex, lastIndex)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <HeroTable bg={THEME.DASHBOARD.TABLE_PRODUCT_BG}>
        {PRODUCTS.map(product => (
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
                onHandleChangePrice={e => handleConvertPrice(e.target.value)}
                onHandleChangeSupplier={e => setSupplier(e.target.value)}
                onHandleChangeDescription={e => setDescription(e.target.value)}
                onHandleChangeQuantity={e =>
                  handleConvertNumber(e.target.value)
                }
                onHandleChangeCategoryId={e => setCategoryId(e.target.value)}
              />
            </ModalHeroUpdate>

            <ModalHeroDelete
              title="Produto"
              label="este"
              items={product}
              onHandleDelete={() => {
                handleDeleteProduct(product.id)
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

      <Flex mt={4} py={6} w={'full'} align={'center'} justify={'center'}>
        {Array.from({
          length: Math.ceil(allProductsFormat.length / productsPerPage),
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

export default memo(CreateProductHero)
