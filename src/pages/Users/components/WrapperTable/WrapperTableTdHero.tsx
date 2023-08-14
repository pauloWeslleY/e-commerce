import { memo } from 'react'
import { Td } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'

const WrapperTableTdHero = ({ label }: { label: string }) => {
  const { THEME } = useThemeColors()

  return (
    <Td
      color={THEME.DASHBOARD.TABLE_COLORS}
      fontSize={'md'}
      fontWeight={'medium'}
    >
      {label}
    </Td>
  )
}

export default memo(WrapperTableTdHero)
