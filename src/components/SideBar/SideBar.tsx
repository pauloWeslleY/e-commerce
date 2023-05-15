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
            transition={"ease-in-out .3s"}
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
            <Flex as={"nav"}>
               <Flex gap={2}>
                  <SideBarMobile collapsed={collapse} />

                  <IconButton
                     aria-label="Menu Collapse"
                     icon={<HamburgerIcon />}
                     display={{ base: "none", lg: "flex" }}
                     onClick={() => setCollapse(!collapse)}
                     variant={"outline"}
                     borderColor={"transparent"}
                     borderWidth={2}
                     transition={"ease-in-out .4s 100ms"}
                     _hover={{
                        bg: THEME.BUTTONS.BTN_ICON_BACKGROUND,
                        color: "purple.700",
                        borderColor: "purple.600",
                     }}
                  />
                  <BtnSwitchDarkMode />
               </Flex>
            </Flex>

            {children}
         </Flex>
      </HStack>
   );
}

export default memo(SideBar);
