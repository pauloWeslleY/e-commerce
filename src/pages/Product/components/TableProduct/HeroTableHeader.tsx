import { memo } from 'react'
import { SimpleGrid, chakra } from '@chakra-ui/react'
import { useColors } from '../../../../hooks/useColors'

function HeroTableHeader() {
  const TABLE_HEADER = ['ID', 'Nome', 'Preço', 'Quantidade', 'Categorias']
  const { THEME } = useColors()

  return (
    <SimpleGrid
      spacingY={5}
      columns={{ base: 1, md: 6 }}
      bg={THEME.DASHBOARD.TABLE_PRODUCT_HEADER_BG}
      color={THEME.DASHBOARD.TABLE_PRODUCT_TITLE_COLORS}
      w={{ base: 230, md: 'full' }}
      py={{ base: 1, md: 4 }}
      px={{ base: 2, md: 10 }}
      fontWeight={600}
      fontSize={'md'}
      textTransform={'uppercase'}
      alignItems={'center'}
      rounded={'md'}
    >
      {TABLE_HEADER.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
      <chakra.span textAlign={{ md: 'right' }}>Ações</chakra.span>
    </SimpleGrid>
  )
}

export default memo(HeroTableHeader)
