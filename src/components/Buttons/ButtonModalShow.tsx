import { memo } from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { useThemeColors } from '../../hooks/useThemeColors'
import { BsFillEyeFill } from 'react-icons/bs'

const ButtonModalShow = ({ ...rest }: IconButtonProps) => {
  const { THEME } = useThemeColors()

  return (
    <IconButton
      {...rest}
      icon={<BsFillEyeFill />}
      size={'sm'}
      rounded={'lg'}
      bg={'emerald.400'}
      color={'whiteAlpha.900'}
      borderColor={'transparent'}
      borderWidth={2}
      transition={'ease-in-out .4s 100ms'}
      _hover={{
        bg: THEME.BUTTONS.BTN_ICON_BACKGROUND,
        color: 'emerald.600',
        borderColor: 'emerald.600',
      }}
    />
  )
}

export default memo(ButtonModalShow)
