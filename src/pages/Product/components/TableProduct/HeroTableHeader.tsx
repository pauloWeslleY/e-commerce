import { memo } from 'react'
import { SimpleGrid, chakra } from '@chakra-ui/react'
import { useColors } from '../../../../hooks/useColors'

const HeroTableHeader = () => {
  const TABLE_HEADER: Array<string> = ['ID', 'Nome', 'Preço', 'Quantidade', 'Categorias']
  const { THEME } = useColors()

  return (
    <SimpleGrid
      as={'header'}
      spacingY={5}
      columns={{ base: 1, md: 6 }}
      bg={THEME.DASHBOARD.TABLE_PRODUCT_HEADER_BG}
      color={THEME.DASHBOARD.TABLE_PRODUCT_TITLE_COLORS}
      w={{ base: 230, md: 'full' }}
      py={{ base: 1, md: 4 }}
      px={{ base: 2, md: 10 }}
      fontWeight={'semibold'}
      fontSize={'md'}
      textTransform={'uppercase'}
    >
      {TABLE_HEADER.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
      <chakra.span textAlign={{ md: 'right' }}>Ações</chakra.span>
    </SimpleGrid>
  )
}

export default memo(HeroTableHeader)
