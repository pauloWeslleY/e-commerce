import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Heading, Link, ListIcon, Text } from '@chakra-ui/react'
import { MenuItemsProps } from '../../../types/MenuItemsProps'
import { useThemeColors } from '../../../hooks/useThemeColors'

interface SideBarNavItemProps {
  item: MenuItemsProps
  isActive?: boolean
  collapsed: boolean
  onToggle?: () => void
  onItemClick?: () => void
}

function SideBarNavItem(props: SideBarNavItemProps) {
  const { item, isActive, collapsed } = props
  const { label } = item
  const { THEME } = useThemeColors()

  if (item.type === 'link') {
    const { icon, path } = item

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
          fontWeight={'medium'}
          w={'full'}
          color={isActive ? 'blackAlpha.700' : THEME.DASHBOARD.SIDE_BAR_COLORS}
          transition={'all ease-in-out .3s'}
          _hover={{
            color: 'purple.700',
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
