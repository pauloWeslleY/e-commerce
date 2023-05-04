import { ReactNode, memo } from "react";
import {
   PopoverContentProps,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverHeader,
   Portal,
   Stack,
} from "@chakra-ui/react";

interface HeroPopoverProps extends PopoverContentProps {
   title: string;
   children: ReactNode;
}

function HeroPopover({ title, children, ...props }: HeroPopoverProps) {
   return (
      <Portal>
         <PopoverContent {...props}>
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
