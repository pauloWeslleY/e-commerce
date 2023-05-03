import { ReactNode } from "react";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { DashboardMobileNav } from "./components/DashboardMobileNav";
import { DashboardHeroContent } from "./components/DashboardHeroContent";
import { useColors } from "../../hooks/useColors";

export function Dashboard({ children }: { children: ReactNode }) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { THEME } = useColors();

   return (
      <Box as={"main"} minH={"100vh"} bg={THEME.DASHBOARD.BACKGROUND}>
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

         {/* HACK: mobile_nav */}
         <DashboardMobileNav onOpen={onOpen} />
         <Box ml={{ base: 0, md: 60 }} p={"4"}>
            {children}
         </Box>
      </Box>
   );
}
