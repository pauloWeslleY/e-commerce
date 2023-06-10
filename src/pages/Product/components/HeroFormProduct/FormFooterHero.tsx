import { Box } from '@chakra-ui/react'
import { memo } from 'react'
import { IsButton } from '../../../../components/Buttons'
import { useThemeColors } from '../../../../hooks/useThemeColors'

interface FormFooterHeroProps {
  onHandleClick: () => void
}

const FormFooterHero = ({ onHandleClick }: FormFooterHeroProps) => {
  const { THEME } = useThemeColors()

  return (
    <Box
      py={3}
      px={{ base: 4, sm: 6 }}
      bg={THEME.DASHBOARD.FORM_FOOTER_BACKGROUND}
      textAlign={'right'}
    >
      <IsButton title="Criar" type="submit" onClick={onHandleClick} />
    </Box>
  )
}

export default memo(FormFooterHero)
