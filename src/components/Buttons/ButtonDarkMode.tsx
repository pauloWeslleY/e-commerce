import { memo } from 'react'
import { Button, ButtonProps, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useThemeColors } from '../../hooks/useThemeColors'

const ButtonDarkMode = ({ ...rest }: ButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { THEME } = useThemeColors()

  return (
    <Button
      {...rest}
      aria-label="open menu"
      size={'md'}
      variant={'outline'}
      borderColor={'transparent'}
      borderWidth={2}
      transition={'ease-in-out .4s 100ms'}
      _hover={{
        bg: THEME.BUTTONS.BTN_ICON_BACKGROUND,
        color: 'purple.700',
        borderColor: 'purple.600',
      }}
      onClick={toggleColorMode}
    >
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

export default memo(ButtonDarkMode)
