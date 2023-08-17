import { memo } from 'react'
import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { IconType } from 'react-icons'
import { NavTitle } from './index'
import { useThemeColors } from '../../hooks/useThemeColors'

interface NavBarProps {
  title?: string
  label: string
  isButton: boolean
  icon: IconType
  onOpen?: () => void
}

const NavBar = (props: NavBarProps) => {
  const { label, title, icon, onOpen, isButton } = props
  const { THEME } = useThemeColors()

  return (
    <Box
      as={'header'}
      bg={THEME.HOME.BACKGROUND}
      my={4}
      p={2}
      rounded={'lg'}
      shadow={'md'}
    >
      <Flex h={16} align={'center'} justify={'space-between'}>
        <NavTitle label={label} icon={icon} />

        {isButton && (
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button
                variant={'outline'}
                color={THEME.BUTTONS.IS_BUTTON_COLORS}
                borderColor={'transparent'}
                borderWidth={2}
                transition={'ease-in-out .4s 100ms'}
                _hover={{
                  bg: THEME.BUTTONS.BTN_ICON_BACKGROUND,
                  color: 'violet.600',
                  borderColor: 'violet.600',
                  transform: 'translateY(2px)',
                  boxShadow: 'none',
                }}
                size={'sm'}
                mr={4}
                leftIcon={<AddIcon />}
                onClick={onOpen}
              >
                {title}
              </Button>
            </Stack>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default memo(NavBar)
