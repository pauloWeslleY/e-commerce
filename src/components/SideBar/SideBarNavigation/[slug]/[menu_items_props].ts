import {
   MdOutlineNotificationsActive,
   MdOutlineCalendarMonth,
} from "react-icons/md";
import { BiCategoryAlt, BiHomeAlt2, BiUser } from "react-icons/bi";
import { TbTool } from "react-icons/tb";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { BsGear } from "react-icons/bs";
// import { RxDashboard } from "react-icons/rx";
import { HiOutlineMail, HiOutlineShoppingBag } from "react-icons/hi";
import { MenuItemsProps } from "../../../../types/MenuItemsProps";

const MENU_ITEMS: Array<MenuItemsProps> = [
   {
      type: "header",
      label: "Menu",
   },
   {
      type: "link",
      label: "Home",
      icon: BiHomeAlt2,
      path: "/dashboard",
   },
   {
      type: "link",
      label: "Produtos",
      icon: HiOutlineShoppingBag,
      path: "/dashboard/product",
   },

   {
      type: "link",
      label: "Categorias",
      icon: BiCategoryAlt,
      path: "/dashboard/categories",
   },
   {
      type: "link",
      label: "Calendário",
      icon: MdOutlineCalendarMonth,
      path: "/",
   },
   {
      type: "link",
      label: "Email",
      icon: HiOutlineMail,
      path: "/",
   },
   {
      type: "link",
      label: "Usuários",
      icon: BiUser,
      path: "/dashboard/users",
   },
   {
      type: "header",
      label: "Account",
   },
   {
      type: "link",
      label: "Notificações",
      icon: MdOutlineNotificationsActive,
      path: "/",
      notifications: 24,
   },
   {
      type: "link",
      label: "Chat",
      icon: HiOutlineChatBubbleBottomCenter,
      path: "/",
      messages: 8,
   },
   {
      type: "link",
      label: "Ferramentas",
      icon: TbTool,
      path: "/dashboard/profile",
   },
   {
      type: "link",
      label: "Configurações",
      icon: BsGear,
      path: "/",
   },
];

export { MENU_ITEMS };
