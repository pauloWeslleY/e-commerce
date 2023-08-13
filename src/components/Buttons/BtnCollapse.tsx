import { memo } from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { useThemeColors } from '../../hooks/useThemeColors'

interface BtnCollapseProps extends IconButtonProps {
  onHandleToggle: () => void
}

const BtnCollapse = ({ onHandleToggle, ...rest }: BtnCollapseProps) => {
  const { THEME } = useThemeColors()

  return (
    <IconButton
      {...rest}
      icon={<HamburgerIcon />}
      display={{ base: 'none', lg: 'flex' }}
      onClick={onHandleToggle}
      variant={'outline'}
      borderColor={'transparent'}
      borderWidth={2}
      transition={'ease-in-out .4s 100ms'}
      _hover={{
        bg: THEME.BUTTONS.BTN_ICON_BACKGROUND,
        color: 'purple.700',
        borderColor: 'purple.600',
      }}
    />
  )
}

export default memo(BtnCollapse)
