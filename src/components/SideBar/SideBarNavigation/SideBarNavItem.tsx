import { memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Box, Heading, Link, ListIcon, Text } from '@chakra-ui/react'
import { MenuItemsProps } from '../../../types/MenuItemsProps'
import { useThemeColors } from '../../../hooks/useThemeColors'

interface SideBarNavItemProps {
  item: MenuItemsProps
  collapsed: boolean
}

function SideBarNavItem(props: SideBarNavItemProps) {
  const { item, collapsed } = props
  const { label } = item
  const { THEME } = useThemeColors()

  if (item.type === 'link') {
    const { icon, path } = item
    const location = useLocation()
    const isActive = location.pathname === path

    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        my={6}
      >
        <Link
          as={NavLink}
          to={path}
          display={'flex'}
          alignItems={'center'}
          justifyContent={!collapsed ? 'center' : ''}
          gap={2}
          w={'full'}
          p={1}
          fontWeight={isActive ? 'medium' : 'semibold'}
          borderRadius={5}
          bg={isActive ? THEME.DASHBOARD.SIDE_BAR_BG_ACTIVE : 'transparent'}
          color={isActive ? 'purple.100' : THEME.DASHBOARD.SIDE_BAR_COLORS}
          transition={'all ease-in-out .3s'}
          _hover={{
            color: THEME.DASHBOARD.SIDE_BAR_BG_ACTIVE_HOVER,
            transform: 'translateY(-3%)',
            textDecoration: 'none',
          }}
        >
          <ListIcon as={icon} fontSize={22} m={0} />
          {collapsed && <Text as={'span'}>{label}</Text>}
        </Link>
      </Box>
    )
  }

  return (
    <Heading
      color={THEME.SPAN_COLORS}
      fontWeight={600}
      fontSize={'sm'}
      textTransform={'uppercase'}
      pt={collapsed ? 1 : 0}
      my={6}
    >
      <Text display={collapsed ? 'flex' : 'none'}>{label}</Text>
    </Heading>
  )
}

export default memo(SideBarNavItem)
