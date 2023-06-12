import React, { ReactNode, memo } from 'react'
import { ButtonGroup, Td, Tr } from '@chakra-ui/react'
import { HeroTableContent, HeroTableContentMobile } from './index'
import { ModalProductHero } from '../ModalProductHero'
import { ProductFormatProps } from '../../../../types/ProductFormatProps'

interface HeroTableColumnProps {
  product: ProductFormatProps
  children: ReactNode
}

interface ProductsProps {
  label: string
  value: string | number
}

const HeroTableRow = ({ product, children }: HeroTableColumnProps) => {
  const { id, name, price, quantity, categoryId } = product
  const prodId = id.toUpperCase().slice(0, 9)
  const PRODUCTS: Array<ProductsProps> = [
    { label: 'ID:', value: prodId },
    { label: 'Nome:', value: name },
    { label: 'Preço:', value: price },
    { label: 'Quantidade:', value: quantity },
    { label: 'Categoria:', value: categoryId },
  ]

  return (
    <Tr
      display={{ base: 'grid', md: 'table-row' }}
      sx={{
        '@media print': { display: 'table-row' },
        gridTemplateColumns: 'minmax(0px, 35%) minmax(0px, 65%)',
        gridGap: '10px',
      }}
    >
      {PRODUCTS.map((item, i) => (
        <React.Fragment key={i}>
          <HeroTableContentMobile title={item.label} />
          <HeroTableContent title={item.value} />
        </React.Fragment>
      ))}
      <HeroTableContentMobile title="Ações" />
      <Td>
        <ButtonGroup size={'sm'} spacing={3}>
          <ModalProductHero product={product} />
          {children}
        </ButtonGroup>
      </Td>
    </Tr>
  )
}
export default memo(HeroTableRow)
