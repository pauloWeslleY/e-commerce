import { memo, useContext } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { AuthenticationContext } from "../../contexts/authContextProvider";
import { useColors } from "../../hooks/useColors";
import { SideBarContainerProps } from "../../types/SideBarType";
import { SideBarAvatarMenu } from "./index";

function SideBarAvatarHero({ collapsed }: SideBarContainerProps) {
   const { userOnAuth } = useContext(AuthenticationContext);
   const { THEME } = useColors();

   return (
      <Flex
         align={"center"}
         justify={"space-between"}
         flexDir={collapsed ? "row" : "column-reverse"}
         gap={2}
         borderWidth={collapsed ? 1 : 0}
         borderColor={THEME.DASHBOARD.SIDEBAR_AVATAR_HERO_BORDER_COLORS}
         borderRadius={"full"}
         w={"full"}
         p={2}
      >
         <Avatar name={userOnAuth.username} bg={"purple.400"} />
         {collapsed && (
            <Flex
               w={"full"}
               align={"flex-start"}
               justify={"center"}
               flexDir={"column"}
               gap={4}
            >
               <Text
                  fontSize={"sm"}
                  fontWeight={600}
                  pb={0}
                  lineHeight={0}
                  color={THEME.DASHBOARD.TEXT_COLORS}
               >
                  {userOnAuth.username}
               </Text>
               <Text
                  as={"small"}
                  color={THEME.DASHBOARD.SIDEBAR_AVATAR_HERO_COLORS}
                  fontSize={12}
                  lineHeight={0}
               >
                  {userOnAuth.email.slice(0, 22)}
               </Text>
            </Flex>
         )}

         <SideBarAvatarMenu />
      </Flex>
   );
}

export default memo(SideBarAvatarHero);
