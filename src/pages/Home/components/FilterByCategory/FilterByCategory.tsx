import { memo, useMemo } from 'react'
import { Flex, GridItem, Text } from '@chakra-ui/react'
import { useFetch } from '../../../../hooks/useFetch'
import { ModalHeroShowProducts } from '../ModalHeroShowProducts'
import { useThemeColors } from '../../../../hooks/useThemeColors'

const FilterByCategory = () => {
  const { isCategories, product } = useFetch()
  const { THEME } = useThemeColors()

  const categoryByProducts = useMemo(() => {
    const categories = isCategories.map(props => {
      const prod = product.filter(item => item.categoryId === props.name)
      return {
        id: props.id,
        name: props.name,
        products: prod,
      }
    })

    return categories
  }, [isCategories, product])

  return (
    <>
      {categoryByProducts.map(props => (
        <GridItem key={props.id} colSpan={{ lg: 2 }}>
          <Flex
            flexDir={'column'}
            align={'center'}
            justify={'center'}
            bg={THEME.HOME.BACKGROUND}
            borderColor={'purple.600'}
            borderWidth={2}
            borderStyle={'solid'}
            borderRadius={3}
            p={2}
            rounded={'md'}
            boxShadow={'lg'}
            textAlign={'center'}
            transition={'transform .3s ease-in'}
            _hover={{
              transform: 'translateY(-5px)',
            }}
          >
            <Text
              as={'span'}
              color={'purple.600'}
              fontFamily={'Poppins'}
              fontSize={'xl'}
            >
              {props.name}
            </Text>

            <Flex as={'article'} gap={4} p={2}>
              <ModalHeroShowProducts
                title={props.name}
                product={props.products}
              />
            </Flex>
          </Flex>
        </GridItem>
      ))}
    </>
  )
}

export default memo(FilterByCategory)
