import { memo } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useThemeColors } from '../../hooks/useThemeColors'

interface IsButtonProps extends ButtonProps {
  title: string
}

const IsButton = (props: IsButtonProps) => {
  const { title, ...rest } = props
  const { THEME } = useThemeColors()

  return (
    <Button
      {...rest}
      px={8}
      variant={'outline'}
      color={THEME.BUTTONS.IS_BUTTON_COLORS}
      borderColor={THEME.BUTTONS.IS_BUTTON_COLORS}
      borderWidth={2}
      borderRadius={'0.4rem'}
      transition={'ease-in-out .3s'}
      _hover={{
        bg: THEME.BUTTONS.BTN_ICON_BACKGROUND,
        color: THEME.BUTTONS.IS_BUTTON_COLORS_HOVER,
        borderColor: THEME.BUTTONS.IS_BUTTON_COLORS_HOVER,
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
    >
      {title}
    </Button>
  )
}

export default memo(IsButton)
