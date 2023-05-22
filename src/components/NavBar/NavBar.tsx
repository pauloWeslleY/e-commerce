import { memo } from 'react'
import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { IconType } from 'react-icons'
import { NavTitle } from './index'
import { useColors } from '../../hooks/useColors'

interface NavBarProps {
  title?: string
  label: string
  icon: IconType
  onOpen?: () => void
}

function NavBar(props: NavBarProps) {
  const { label, title, icon, onOpen } = props
  const { THEME } = useColors()

  return (
    <Box
      as={'header'}
      my={4}
      p={2}
      rounded={'lg'}
      bg={THEME.HOME.BACKGROUND}
      shadow={'md'}
    >
      <Flex h={16} align={'center'} justify={'space-between'}>
        <NavTitle label={label} icon={icon} />

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button
              variant={'ghost'}
              colorScheme={'purple'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}
              onClick={onOpen}
            >
              {title}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}

export default memo(NavBar)
