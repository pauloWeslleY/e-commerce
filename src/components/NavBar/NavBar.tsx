import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { memo } from "react";

interface NavBarProps {
   onOpen: () => void;
   title: string;
   label: string;
}

function NavBar(props: NavBarProps) {
   const { label, title, onOpen } = props;

   return (
      <Box px={4}>
         <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box as={"h2"} fontFamily={"Poppins"}>
               {label}
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
                     {title}
                  </Button>
               </Stack>
            </Flex>
         </Flex>
      </Box>
   );
}

export default memo(NavBar);
