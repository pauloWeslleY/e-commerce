import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BiCategory, BiHomeAlt2, BiUser } from "react-icons/bi";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { FiTool } from "react-icons/fi";
import { BsGear } from "react-icons/bs";
import { DashboardNavItems } from "../DashboardNavItems";

interface MenuItemProps {
   name: string;
   icon: IconType;
   path: string;
}

const MENU_ITEMS: Array<MenuItemProps> = [
   {
      name: "Home",
      icon: BiHomeAlt2,
      path: "/dashboard",
   },
   {
      name: "Produtos",
      icon: MdOutlineStoreMallDirectory,
      path: "/dashboard/product",
   },
   {
      name: "Categorias",
      icon: BiCategory,
      path: "/dashboard/categories",
   },
   {
      name: "Usuário",
      icon: BiUser,
      path: "/dashboard/users",
   },
   {
      name: "Profile",
      icon: FiTool,
      path: "/dashboard/users",
   },
   {
      name: "Settings",
      icon: BsGear,
      path: "/dashboard/main",
   },
];

function DashboardNavigation() {
   const navigate = useNavigate();

   return (
      <Box>
         {MENU_ITEMS.map((link) => (
            <DashboardNavItems
               key={link.name}
               icon={link.icon}
               onClickNav={() => navigate(link.path)}
            >
               {link.name}
            </DashboardNavItems>
         ))}
      </Box>
   );
}

export default memo(DashboardNavigation);
