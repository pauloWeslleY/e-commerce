import { memo, useMemo } from 'react'
import { Flex } from '@chakra-ui/react'
import { useFetch } from '../../../../hooks/useFetch'
import { CardFilterByCategory } from './CardFilterByCategory'

const FilterByCategory = () => {
  const { isCategories, product } = useFetch()

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
    <Flex flexWrap={'wrap'} flexDir={'row'} gap={2}>
      {categoryByProducts.map(props => (
        <CardFilterByCategory key={props.id} cards={props} />
      ))}
    </Flex>
  )
}

export default memo(FilterByCategory)
