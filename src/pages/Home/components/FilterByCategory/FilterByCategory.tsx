import { memo, useMemo } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { useFetch } from '../../../../hooks/useFetch'
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
    <Flex flexWrap={'wrap'} flexDir={'row'} gap={2}>
      {categoryByProducts.map(props => (
        <Flex
          key={props.id}
          flexBasis={16}
          flexShrink={1}
          flexGrow={1}
          align={'center'}
          justify={'center'}
          bg={THEME.HOME.BACKGROUND}
          borderColor={'purple.600'}
          borderWidth={2}
          borderStyle={'solid'}
          borderRadius={3}
          p={1}
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
        </Flex>
      ))}
    </Flex>
  )
}

export default memo(FilterByCategory)
