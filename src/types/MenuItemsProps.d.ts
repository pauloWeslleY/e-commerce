import { IconType } from "react-icons";

interface MenuItemsProps {
   type: string;
   label: string;
   icon?: IconType;
   path?: string;
   notifications?: number;
   messages?: number;
}

export { MenuItemsProps };
