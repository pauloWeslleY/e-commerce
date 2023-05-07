import { memo } from "react";
import { List, ListItem } from "@chakra-ui/react";
import {
   MdOutlineSpaceDashboard,
   MdOutlineShoppingBag,
   MdMailOutline,
   MdCalendarToday,
   MdOutlineNotificationsActive,
   MdOutlineChatBubbleOutline,
} from "react-icons/md";
import { BiCategoryAlt, BiUser } from "react-icons/bi";
import { TbTool } from "react-icons/tb";
import {
   SideBarContainerProps,
   SideBarNavItem,
   MenuItemsProps,
} from "../index";
import { BsGear } from "react-icons/bs";

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
      icon: BiCategoryAlt,
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
      label: "Users",
      icon: BiUser,
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
      label: "Profile",
      icon: TbTool,
      path: "/",
   },
   {
      type: "link",
      label: "Settings",
      icon: BsGear,
      path: "/",
   },
];

function SideBarNavigation({ collapsed }: SideBarContainerProps) {
   return (
      <List py={3}>
         {MENU_ITEMS.map((item, index) => (
            <ListItem key={index}>
               <SideBarNavItem item={item} collapse={collapsed} />
            </ListItem>
         ))}
      </List>
   );
}

export default memo(SideBarNavigation);
