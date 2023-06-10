import { memo, useRef } from "react";
import {
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   Flex,
   IconButton,
   useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { SideBarContainer } from "./index";
import { SideBarContainerProps } from "../../types/SideBarType";
import { useColors } from "../../hooks/useColors";

function SideBarMobile({ collapsed }: SideBarContainerProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { THEME } = useColors();
   const firstField = useRef();

   return (
      <>
         <IconButton
            aria-label="Menu Collapse"
            icon={<HamburgerIcon />}
            display={{ base: "block", lg: "none" }}
            onClick={onOpen}
         />
         <Drawer
            isOpen={isOpen}
            placement="left"
            initialFocusRef={firstField}
            onClose={onClose}
         >
            <DrawerOverlay />
            <DrawerContent bg={THEME.DASHBOARD.SIDE_BAR_BG}>
               <DrawerHeader borderBottomWidth="1px">
                  <Flex justify={"center"}>
                     <IconButton
                        aria-label="Close Sidebar"
                        icon={<CloseIcon />}
                        variant={"ghost"}
                        color={"gray.700"}
                        onClick={onClose}
                     />
                  </Flex>
               </DrawerHeader>

               <DrawerBody>
                  <SideBarContainer collapsed={collapsed} />
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   );
}

export default memo(SideBarMobile);
