import { memo } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { NavTitle } from '../NavBar'
import { useThemeColors } from '../../hooks/useThemeColors'
import { NavBarProps } from '../../types/NavBarType'

const HeroTitleBar = (props: NavBarProps) => {
  const { THEME } = useThemeColors()

  return (
    <Box
      as={'header'}
      my={4}
      p={2}
      rounded={'lg'}
      shadow={'md'}
      bg={THEME.HOME.BACKGROUND}
    >
      <Flex h={16}>
        <NavTitle label={props.label} icon={props.icon} />
      </Flex>
    </Box>
  )
}

export default memo(HeroTitleBar)
