import { memo } from 'react'
import { Th, Thead, Tr } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'

const HeroTableHead = () => {
  const { THEME } = useThemeColors()
  const TABLE_HEADER: Array<string> = [
    'ID',
    'Nome',
    'Preço',
    'Quantidade',
    'Categorias',
    'Ações',
  ]

  return (
    <Thead
      display={{ base: 'none', lg: 'table-header-group' }}
      sx={{
        '@media print': {
          display: 'table-header-group',
        },
      }}
    >
      <Tr>
        {TABLE_HEADER.map((item, i) => (
          <Th
            key={i}
            color={THEME.DASHBOARD.TABLE_PRODUCT_TITLE_COLORS}
            fontWeight={'semibold'}
            fontSize={'md'}
          >
            {item}
          </Th>
        ))}
      </Tr>
    </Thead>
  )
}

export default memo(HeroTableHead)
