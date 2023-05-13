import { memo } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useFetch } from "../../../../hooks/useFetch";
import { useColors } from "../../../../hooks/useColors";

function HeroUsersList() {
   const { users } = useFetch();
   const { THEME } = useColors();

   return (
      <Flex as={"section"} flexDir={"column"} px={8} py={4}>
         <Stack py={2}>
            <Text as={"h2"} fontSize={"2xl"} fontWeight={500}>
               Usuários Cadastrado
            </Text>
         </Stack>
         <Flex
            flexDir={"column"}
            fontFamily={"Poppins"}
            color={THEME.TEXT_COLORS}
         >
            {users.map((user, index) => (
               <Box
                  key={`${user.id}${index}`}
                  borderBottomWidth={2}
                  borderColor={"purple.700"}
                  py={5}
               >
                  <span>{user.username}</span>
               </Box>
            ))}
         </Flex>
      </Flex>
   );
}

export default memo(HeroUsersList);
