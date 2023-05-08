import { memo } from "react";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useColors } from "../../hooks/useColors";
import { SideBarContainerProps } from "../../types/SideBarType";
import Logotipo from "../../assets/logo.svg";

function SideBarLogoSearch({ collapsed }: SideBarContainerProps) {
   const { THEME } = useColors();

   return (
      <Flex
         w={"full"}
         align={"center"}
         justify={"space-between"}
         flexDir={collapsed ? "row" : "column"}
         gap={4}
      >
         <Box display={"flex"} alignItems={"center"} gap={2}>
            <Image src={Logotipo} alt={"Logo"} boxSize={"2.5rem"} />
            {collapsed && (
               <Text
                  as={"h2"}
                  fontWeight={900}
                  fontSize={"2xl"}
                  fontFamily={"Inter"}
                  letterSpacing={1}
                  color={THEME.DASHBOARD.SIDE_BAR_TITLE_COLORS}
               >
                  System
                  <Box
                     as={"span"}
                     bgGradient={"linear(to-r, purple.700, purple.400)"}
                     backgroundClip={"text"}
                  >
                     Stock
                  </Box>
               </Text>
            )}
         </Box>
         <IconButton
            aria-label="Search"
            variant={"ghost"}
            icon={<AiOutlineSearch />}
            fontSize={16}
            color={THEME.TEXT_COLORS}
            borderRadius={"50%"}
         />
      </Flex>
   );
}

export default memo(SideBarLogoSearch);
