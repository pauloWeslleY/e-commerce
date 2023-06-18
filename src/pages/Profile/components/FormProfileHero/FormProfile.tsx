import { memo, ReactNode } from 'react'
import { chakra, Stack } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'

const FormProfile = ({ children }: { children: ReactNode }) => {
  const { THEME } = useThemeColors()

  return (
    <chakra.form
      shadow={'md'}
      rounded={[null, 'md']}
      overflow={{ sm: 'hidden' }}
    >
      <Stack
        px={4}
        py={5}
        bg={THEME.DASHBOARD.FORM_BACKGROUND}
        spacing={6}
        p={{ sm: 6 }}
      >
        {children}
      </Stack>
    </chakra.form>
  )
}

export default memo(FormProfile)
