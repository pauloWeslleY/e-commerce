import { ReactNode, memo } from "react";
import {
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverHeader,
   Portal,
   Stack,
} from "@chakra-ui/react";

type HeroPopoverProps = {
   title: string;
   children: ReactNode;
};

function HeroPopover({ title, children }: HeroPopoverProps) {
   return (
      <Portal>
         <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>{title}</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
               <Stack py={4} spacing={4}>
                  {children}
               </Stack>
            </PopoverBody>
         </PopoverContent>
      </Portal>
   );
}

export default memo(HeroPopover);
