import { memo } from "react";
import { List, ListItem } from "@chakra-ui/react";
import {
   MdOutlineSpaceDashboard,
   MdOutlineShoppingBag,
   MdMailOutline,
   MdOutlineFlag,
   MdCalendarToday,
   MdOutlineSupervisorAccount,
   MdOutlineNotificationsActive,
   MdOutlineChatBubbleOutline,
   MdOutlineSettingsInputComposite,
} from "react-icons/md";
import {
   SideBarContainerProps,
   SideBarNavItem,
   MenuItemsProps,
} from "../index";

const MENU_ITEMS: Array<MenuItemsProps> = [
   {
      type: "link",
      label: "Dashboard",
      icon: MdOutlineSpaceDashboard,
      path: "/dashboard",
   },
   {
      type: "link",
      label: "Products",
      icon: MdOutlineShoppingBag,
      path: "/dashboard/product",
   },

   {
      type: "link",
      label: "Categories",
      icon: MdOutlineFlag,
      path: "/dashboard/categories",
   },
   {
      type: "link",
      label: "Calendar",
      icon: MdCalendarToday,
      path: "/",
   },
   {
      type: "link",
      label: "Mail",
      icon: MdMailOutline,
      path: "/",
   },
   {
      type: "link",
      label: "Contacts",
      icon: MdOutlineSupervisorAccount,
      path: "/dashboard/users",
   },

   {
      type: "header",
      label: "Account",
   },

   {
      type: "link",
      label: "Notifications",
      icon: MdOutlineNotificationsActive,
      path: "/",
      notifications: 24,
   },
   {
      type: "link",
      label: "Chat",
      icon: MdOutlineChatBubbleOutline,
      path: "/",
      messages: 8,
   },
   {
      type: "link",
      label: "Settings",
      icon: MdOutlineSettingsInputComposite,
      path: "/",
   },
];

function SideBarNavigation({ collapsed }: SideBarContainerProps) {
   return (
      <List>
         {MENU_ITEMS.map((item, index) => (
            <ListItem key={index}>
               <SideBarNavItem
                  item={item}
                  // isActive={index === 3}
                  collapse={collapsed}
               />
            </ListItem>
         ))}
      </List>
   );
}

export default memo(SideBarNavigation);
