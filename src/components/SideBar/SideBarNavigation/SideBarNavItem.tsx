import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Box, Heading, Link, ListIcon, Text } from "@chakra-ui/react";
import { MenuItemsProps } from "../../../types/MenuItemsProps";
import { useColors } from "../../../hooks/useColors";

interface SideBarNavItemProps {
   item: MenuItemsProps;
   isActive?: boolean;
   collapsed: boolean;
}

function SideBarNavItem(props: SideBarNavItemProps) {
   const { item, isActive, collapsed } = props;
   const { label } = item;
   const { THEME } = useColors();

   if (item.type === "link") {
      const { icon, notifications, messages, path } = item;

      return (
         <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            my={6}
         >
            <Link
               as={NavLink}
               to={path}
               display={"flex"}
               alignItems={"center"}
               justifyContent={!collapsed ? "center" : ""}
               gap={2}
               fontWeight={600}
               w={"full"}
               color={
                  isActive ? "blackAlpha.700" : THEME.DASHBOARD.SIDE_BAR_COLORS
               }
               transition={"ease-in-out .2s"}
               _hover={{
                  textDecoration: "none",
                  color: "purple.700",
                  transform: "translateY(-3%)",
               }}
            >
               <ListIcon as={icon} fontSize={22} m={0} />
               {collapsed && <Text as={"span"}>{label}</Text>}
            </Link>
            {collapsed && (
               <>
                  {notifications && (
                     <Badge
                        borderRadius={"full"}
                        colorScheme={"teal"}
                        w={6}
                        textAlign={"center"}
                     >
                        {notifications}
                     </Badge>
                  )}
                  {messages && (
                     <Badge
                        borderRadius={"full"}
                        colorScheme={"green"}
                        w={6}
                        textAlign={"center"}
                     >
                        {messages}
                     </Badge>
                  )}
               </>
            )}
         </Box>
      );
   }

   return (
      <Heading
         color={THEME.SPAN_COLORS}
         fontWeight={600}
         fontSize={"sm"}
         textTransform={"uppercase"}
         borderTopWidth={1}
         borderTopColor={THEME.SPAN_COLORS}
         pt={collapsed ? 8 : 0}
         my={6}
      >
         <Text display={collapsed ? "flex" : "none"}>{label}</Text>
      </Heading>
   );
}

export default memo(SideBarNavItem);
