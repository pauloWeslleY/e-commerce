import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Box, Heading, Link, ListIcon, Text } from "@chakra-ui/react";
import { MenuItemsProps } from "../index";
import { useColors } from "../../../hooks/useColors";

interface SideBarNavItemProps {
   item: MenuItemsProps;
   isActive?: boolean;
   collapse: boolean;
}

function SideBarNavItem(props: SideBarNavItemProps) {
   const { item, isActive, collapse } = props;
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
               gap={1}
               alignItems={"center"}
               justifyContent={!collapse ? "center" : ""}
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
               {collapse && <Text as={"span"}>{label}</Text>}
            </Link>
            {collapse && (
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
         pt={collapse ? 8 : 0}
         my={6}
      >
         <Text display={collapse ? "flex" : "none"}>{label}</Text>
      </Heading>
   );
}

export default memo(SideBarNavItem);
