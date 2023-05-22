import { memo } from 'react'
import { List, ListItem } from '@chakra-ui/react'
import { SideBarContainerProps } from '../../../types/SideBarType'
import { MENU_ITEMS } from './[slug]/[menu_items_props]'
import { SideBarNavItem } from '../index'

function SideBarNavigation({ collapsed }: SideBarContainerProps) {
  return (
    <List py={3}>
      {MENU_ITEMS.map((item, index) => (
        <ListItem key={index}>
          <SideBarNavItem item={item} collapsed={collapsed} />
        </ListItem>
      ))}
    </List>
  )
}

export default memo(SideBarNavigation)
