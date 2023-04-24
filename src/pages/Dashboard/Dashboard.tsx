import { ReactNode } from "react";
import {
   Box,
   Drawer,
   DrawerContent,
   useColorModeValue,
   useDisclosure,
} from "@chakra-ui/react";
import { DashboardMobileNav } from "./components/DashboardMobileNav";
import { DashboardHeroContent } from "./components/DashboardHeroContent";

export function Dashboard({ children }: { children: ReactNode }) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   return (
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
         <DashboardHeroContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
         />
         <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement={"left"}
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size={"full"}
         >
            <DrawerContent>
               <DashboardHeroContent onClose={onClose} />
            </DrawerContent>
         </Drawer>
         {/* mobile_nav */}
         <DashboardMobileNav onOpen={onOpen} />
         <Box ml={{ base: 0, md: 60 }} p={"4"}>
            {children}
         </Box>
      </Box>
   );
}
