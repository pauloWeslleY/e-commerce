import { memo } from 'react'
import { Box } from '@chakra-ui/react'
import { SideBarContainerProps } from '../../types/SideBarType'
import {
  SideBarAvatarHero,
  SideBarLogoSearch,
  SideBarNavigation,
} from './index'

interface SideBarProps extends SideBarContainerProps {
  onHandleToggle?: () => void
}

const SideBarContainer = (props: SideBarProps) => {
  const { collapsed, onHandleToggle, onItemClick } = props

  return (
    <>
      <Box w={'full'}>
        <SideBarLogoSearch collapsed={collapsed} />

        <SideBarNavigation
          collapsed={collapsed}
          onHandleToggle={onHandleToggle}
          onItemClick={onItemClick}
        />
      </Box>
      <SideBarAvatarHero collapsed={collapsed} />
    </>
  )
}

export default memo(SideBarContainer)
