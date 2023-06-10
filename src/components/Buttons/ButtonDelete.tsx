import { memo } from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useThemeColors } from '../../hooks/useThemeColors'

const ButtonDelete = ({ ...rest }: IconButtonProps) => {
  const { THEME } = useThemeColors()

  return (
    <IconButton
      {...rest}
      icon={<DeleteIcon />}
      bg={'red.600'}
      color={'whiteAlpha.900'}
      borderColor={'transparent'}
      borderWidth={2}
      transition={'ease-in-out .4s 100ms'}
      _hover={{
        bg: THEME.BUTTONS.BTN_ICON_BACKGROUND,
        color: 'red.700',
        borderColor: 'red.600',
      }}
    />
  )
}
export default memo(ButtonDelete)
