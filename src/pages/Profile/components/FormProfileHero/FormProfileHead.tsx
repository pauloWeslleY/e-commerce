import { memo } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

import { useThemeColors } from '../../../../hooks/useThemeColors'

const FormProfileHead = () => {
  const { THEME } = useThemeColors()

  return (
    <Box px={[4, 0]}>
      <Heading
        fontFamily={'Poppins'}
        fontSize={'lg'}
        fontWeight={'medium'}
        lineHeight={'6'}
      >
        Atualizar Usuário
      </Heading>
      <Text
        mt={1}
        color={THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_COLORS}
        fontSize={'sm'}
        letterSpacing={'wide'}
      >
        Preencha as informações para atualizar seu cadastro
      </Text>
    </Box>
  )
}

export default memo(FormProfileHead)
