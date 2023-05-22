import { memo } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useColors } from '../../hooks/useColors'

interface IsButtonProps extends ButtonProps {
  title: string
}

function IsButton(props: IsButtonProps) {
  const { title, ...rest } = props
  const { THEME } = useColors()

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
        color: 'purple.700',
        borderColor: 'purple.600',
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
    >
      {title}
    </Button>
  )
}

export default memo(IsButton)
