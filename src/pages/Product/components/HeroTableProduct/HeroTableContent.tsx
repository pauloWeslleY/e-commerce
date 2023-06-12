import { memo } from 'react'
import { Td } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'

const HeroTableContent = ({ title }: { title: string | number }) => {
  const { THEME } = useThemeColors()

  return (
    <Td
      color={THEME.DASHBOARD.TABLE_PRODUCT_COLORS}
      fontSize={'md'}
      fontWeight={'medium'}
    >
      {title}
    </Td>
  )
}

export default memo(HeroTableContent)
