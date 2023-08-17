import { memo } from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useThemeColors } from '../../hooks/useThemeColors'

const ButtonModalUpdate = ({ ...rest }: IconButtonProps) => {
  const { THEME } = useThemeColors()

  return (
    <IconButton
      {...rest}
      icon={<EditIcon />}
      bg={'blue.600'}
      color={'whiteAlpha.900'}
      borderColor={'transparent'}
      borderWidth={2}
      transition={'ease-in-out .4s 100ms'}
      _hover={{
        bg: THEME.BUTTONS.BTN_ICON_BACKGROUND,
        color: 'blue.600',
        borderColor: 'blue.600',
      }}
    />
  )
}

export default memo(ButtonModalUpdate)
