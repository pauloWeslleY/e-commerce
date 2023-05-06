import { ReactNode, memo, useRef } from "react";
import {
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
} from "@chakra-ui/react";

interface DrawerHeroProps {
   isOpen: boolean;
   children: ReactNode;
   onClose: () => void;
}

function DrawerHero({ isOpen, onClose, children }: DrawerHeroProps) {
   const btnRef = useRef();

   return (
      <Drawer
         isOpen={isOpen}
         placement="bottom"
         onClose={onClose}
         finalFocusRef={btnRef}
      >
         <DrawerOverlay />
         <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Adicionar Produto</DrawerHeader>

            <DrawerBody>{children}</DrawerBody>
         </DrawerContent>
      </Drawer>
   );
}

export default memo(DrawerHero);
