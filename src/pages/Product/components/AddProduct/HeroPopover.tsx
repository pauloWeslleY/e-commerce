import { memo } from "react";
import {
   Box,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverHeader,
   PopoverTrigger,
   Portal,
   Stack,
} from "@chakra-ui/react";
import { BtnIcon } from "../../../../components/Buttons";
import { BsFillEyeFill } from "react-icons/bs";
import { ProductsType } from "../../../../types/ProductType";

interface HeroPopoverProps {
   popover: ProductsType;
}

function HeroPopover({ popover }: HeroPopoverProps) {
   return (
      <Popover placement="left" trigger="hover">
         <PopoverTrigger>
            <BtnIcon
               colorScheme="teal"
               aria-label="Show item"
               icon={<BsFillEyeFill />}
            />
         </PopoverTrigger>
         <Portal>
            <PopoverContent>
               <PopoverArrow />
               <PopoverHeader>Informações do Item</PopoverHeader>
               <PopoverCloseButton />
               <PopoverBody>
                  <Stack py={4} spacing={4}>
                     <Box textTransform={"uppercase"}>ID: {popover.id}</Box>
                     <span>Nome: {popover.title}</span>
                     <span>Descrição: {popover.description}</span>
                     <span>Preço: R${popover.price}</span>
                     <span>Quantidade: {popover.quantity} unidades</span>
                     <span>Categoria: {popover.category}</span>
                  </Stack>
               </PopoverBody>
            </PopoverContent>
         </Portal>
      </Popover>
   );
}

export default memo(HeroPopover);
