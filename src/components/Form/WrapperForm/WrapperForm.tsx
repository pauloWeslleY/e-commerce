import { ReactNode, memo } from 'react'
import { Flex, FlexProps, Stack } from '@chakra-ui/react'
import { useThemeColors } from '../../../hooks/useThemeColors'

interface WrapperFormProps extends FlexProps {
  children: ReactNode
}

const WrapperForm = ({ children }: WrapperFormProps) => {
  const { THEME } = useThemeColors()

  return (
    <Flex
      as={'main'}
      align={'center'}
      justify={'center'}
      minH={'100vh'}
      bg={THEME.BACKGROUND}
    >
      <Stack as={'section'} spacing={8} p={18} maxW={'2xl'}>
        {children}
      </Stack>
    </Flex>
  )
}

export default memo(WrapperForm)
