import { memo } from 'react'
import { Input, InputProps } from '@chakra-ui/react'
import { useColors } from '../../../hooks/useColors'

function InputBar({ ...rest }: InputProps) {
  const { THEME } = useColors()

  return (
    <Input
      {...rest}
      mt={1}
      bg={'transparent'}
      fontFamily={'Poppins'}
      shadow={'sm'}
      size={'sm'}
      w={'full'}
      variant={'flushed'}
      focusBorderColor={THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_FOCUS_COLORS}
      _placeholder={{
        opacity: 1,
        color: THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_COLORS,
      }}
    />
  )
}

export default memo(InputBar)
