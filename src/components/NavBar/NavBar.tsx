import { Box, Button, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ModalCreateProduct } from "../../pages/Product/components/ModalCreateProduct";

export function NavBar() {
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <Box px={4}>
         <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box>Lista de Produtos</Box>

            <Flex alignItems={"center"}>
               <Stack direction={"row"} spacing={7}>
                  <Button
                     variant={"solid"}
                     colorScheme={"teal"}
                     size={"sm"}
                     mr={4}
                     leftIcon={<AddIcon />}
                     onClick={onOpen}
                  >
                     Criar Produto
                  </Button>
                  <ModalCreateProduct isOpen={isOpen} onClose={onClose} />
               </Stack>
            </Flex>
         </Flex>
      </Box>
   );
}
