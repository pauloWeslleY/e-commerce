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

function SideBarMobile() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const firstField = useRef();
   return (
      <>
         <IconButton
            aria-label="Menu Collapse"
            icon={<HamburgerIcon />}
            display={{ base: "block", lg: "none" }}
            pos={"absolute"}
            top={6}
            left={6}
            onClick={onOpen}
         />
         <Drawer
            isOpen={isOpen}
            placement="left"
            initialFocusRef={firstField}
            onClose={onClose}
         >
            <DrawerOverlay />
            <DrawerContent bg={"whiteAlpha.900"}>
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
                  <SideBarContainer />
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   );
}

export default memo(SideBarMobile);
