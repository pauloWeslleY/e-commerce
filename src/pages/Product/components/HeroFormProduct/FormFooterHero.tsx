import { ReactNode, memo } from 'react'
import { Box } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'

interface FormFooterHeroProps {
  children: ReactNode
}

const FormFooterHero = ({ children }: FormFooterHeroProps) => {
  const { THEME } = useThemeColors()

  return (
    <Box
      py={3}
      px={{ base: 4, sm: 6 }}
      bg={THEME.DASHBOARD.FORM_FOOTER_BACKGROUND}
      textAlign={'right'}
    >
      {children}
    </Box>
  )
}

export default memo(FormFooterHero)
