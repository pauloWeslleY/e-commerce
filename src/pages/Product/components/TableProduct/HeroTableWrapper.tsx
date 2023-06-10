import { ReactNode, memo } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'

interface HeroTableWrapperProps extends FlexProps {
  children: ReactNode
}

const HeroTableWrapper = ({ children, ...rest }: HeroTableWrapperProps) => {
  const { THEME } = useThemeColors()

  return (
    <Flex
      {...rest}
      flexDir={{ base: 'row', md: 'column' }}
      bg={THEME.DASHBOARD.TABLE_PRODUCT_LINE_BG}
    >
      {children}
    </Flex>
  )
}

export default memo(HeroTableWrapper)
