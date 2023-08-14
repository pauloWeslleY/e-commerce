import { memo } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'

interface FormProfileHeadProps {
  title: string
  description: string
}

const FormProfileHead = ({ title, description }: FormProfileHeadProps) => {
  const { THEME } = useThemeColors()

  return (
    <Box px={[4, 0]}>
      <Heading
        fontFamily={'Poppins'}
        fontWeight={'medium'}
        fontSize={'lg'}
        letterSpacing={'wide'}
        lineHeight={'6'}
      >
        {title}
      </Heading>
      <Text
        mt={1}
        color={THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_COLORS}
        fontSize={'sm'}
        letterSpacing={'wide'}
      >
        {description}
      </Text>
    </Box>
  )
}

export default memo(FormProfileHead)
