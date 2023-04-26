import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export function NavBar({ onOpen }: { onOpen: () => void }) {
   return (
      <Box px={4}>
         <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box as={"h2"} fontFamily={"Poppins"}>
               Lista de Produtos
            </Box>

            <Flex alignItems={"center"}>
               <Stack direction={"row"} spacing={7}>
                  <Button
                     variant={"outline"}
                     colorScheme={"teal"}
                     size={"sm"}
                     mr={4}
                     leftIcon={<AddIcon />}
                     onClick={onOpen}
                  >
                     Criar Produto
                  </Button>
               </Stack>
            </Flex>
         </Flex>
      </Box>
   );
}
