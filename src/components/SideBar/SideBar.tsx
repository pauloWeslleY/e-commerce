import { ReactNode, memo, useState } from "react";
import { Flex, HStack, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useColors } from "../../hooks/useColors";
import { SideBarContainer, SideBarMobile } from "./index";
import { BtnSwitchDarkMode } from "../Buttons";

interface SideBarProps {
   children?: ReactNode;
}

function SideBar({ children }: SideBarProps) {
   const [collapse, setCollapse] = useState(true);
   const { THEME } = useColors();

   return (
      <HStack w={"full"} h={"100vh"} bg={THEME.DASHBOARD.BACKGROUND} p={2}>
         <Flex
            as={"aside"}
            bg={THEME.DASHBOARD.SIDE_BAR_BG}
            display={{ base: "none", lg: "flex" }}
            w={"full"}
            h={"full"}
            maxW={collapse ? 350 : 100}
            align={"center"}
            justify={"space-between"}
            flexDir={"column"}
            borderRadius={"3xl"}
            p={6}
            transition={"ease-in-out .2s"}
         >
            <SideBarContainer collapsed={collapse} />
         </Flex>
         <Flex
            as={"main"}
            w={"full"}
            h={"full"}
            flexDir={"column"}
            borderRadius={"2xl"}
            overflowY={"scroll"}
            p={4}
         >
            <SideBarMobile />
            <Flex gap={2}>
               <IconButton
                  aria-label="Menu Collapse"
                  icon={<HamburgerIcon />}
                  display={{ base: "none", lg: "flex" }}
                  onClick={() => setCollapse(!collapse)}
                  variant={"ghost"}
               />
               <BtnSwitchDarkMode />
            </Flex>

            {children}
         </Flex>
      </HStack>
   );
}

export default memo(SideBar);
