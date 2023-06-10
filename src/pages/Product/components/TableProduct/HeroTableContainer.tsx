import { memo, ReactNode } from 'react'
import { Stack } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'

const HeroTableContainer = ({ children }: { children: ReactNode }) => {
  const { THEME } = useThemeColors()

  return (
    <Stack
      as={'section'}
      direction={{ base: 'column' }}
      bg={THEME.DASHBOARD.TABLE_PRODUCT_LINE_BG}
      w={'full'}
      shadow={'md'}
    >
      {children}
    </Stack>
  )
}

export default memo(HeroTableContainer)
