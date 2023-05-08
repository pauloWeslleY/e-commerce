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
import { BsGear } from "react-icons/bs";
import { MenuItemsProps } from "../../../../types/MenuItemsProps";

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
      path: "/dashboard/profile",
   },
   {
      type: "link",
      label: "Settings",
      icon: BsGear,
      path: "/",
   },
];

export { MENU_ITEMS };
