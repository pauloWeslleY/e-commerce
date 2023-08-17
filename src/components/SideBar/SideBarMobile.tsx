import { memo, useRef } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { SideBarContainer } from './index'
import { SideBarContainerProps } from '../../types/SideBarType'
import { useThemeColors } from '../../hooks/useThemeColors'

const SideBarMobile = ({ collapsed }: SideBarContainerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { THEME } = useThemeColors()
  const firstField = useRef()

  return (
    <>
      <IconButton
        aria-label="Menu Collapse"
        icon={<HamburgerIcon />}
        display={{ base: 'block', lg: 'none' }}
        onClick={onOpen}
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
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={THEME.DASHBOARD.SIDE_BAR_BG}>
          <DrawerHeader borderBottomWidth="1px">
            <Flex justify={'center'}>
              <IconButton
                aria-label="Close Sidebar"
                icon={<CloseIcon />}
                variant={'ghost'}
                color={'purple.600'}
                onClick={onClose}
              />
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <SideBarContainer collapsed={collapsed} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default memo(SideBarMobile)
