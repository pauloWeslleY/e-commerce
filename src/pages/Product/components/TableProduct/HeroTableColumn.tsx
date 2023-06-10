import { ReactNode, memo } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { ProductsType } from '../../../../types/ProductType'
import { ModalProductHero } from '../ModalProductHero'
import { HeroTableRowButtons } from './index'

interface HeroTableColumnProps {
  product: ProductsType
  children: ReactNode
}

const HeroTableColumn = ({ children, product }: HeroTableColumnProps) => {
  const { id, name, price, quantity, categoryId } = product
  const { THEME } = useThemeColors()
  const prodId = id.toUpperCase().slice(0, 9)
  const prod = [prodId, name, price, quantity, categoryId]

  return (
    <SimpleGrid
      spacingY={3}
      columns={{ base: 1, md: 6 }}
      w={'full'}
      px={10}
      py={{ base: 1, md: 4 }}
      fontWeight={'medium'}
      alignItems={'center'}
      justifyContent={'center'}
      bg={THEME.DASHBOARD.TABLE_PRODUCT_ROW_BG}
      color={THEME.DASHBOARD.TABLE_PRODUCT_COLORS}
    >
      {prod.map((product, index) => (
        <span key={index}>{product}</span>
      ))}

      <HeroTableRowButtons>
        <ModalProductHero product={product} />
        {children}
      </HeroTableRowButtons>
    </SimpleGrid>
  )
}

export default memo(HeroTableColumn)
