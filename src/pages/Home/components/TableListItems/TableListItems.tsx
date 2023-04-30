import { memo } from "react";
import {
   Flex,
   Grid,
   GridItem,
   Heading,
   ListItem,
   Text,
   UnorderedList,
} from "@chakra-ui/react";
import { useFetch } from "../../../../hooks/useFetch";
import { useColors } from "../../../../hooks/useColors";

function TableListItems() {
   const { users } = useFetch();
   const { THEME } = useColors();

   return (
      <Grid
         templateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(12, 1fr)",
         }}
         my={6}
         gap={9}
      >
         <GridItem
            colSpan={{ lg: 4 }}
            bg={THEME.HOME.GRID_COL_BACKGROUND}
            rounded={"md"}
            p={1}
            boxShadow={"lg"}
         >
            <Flex
               as={"section"}
               flexDir={"column"}
               w={{ base: "full", md: "20vw" }}
               p={1}
            >
               <UnorderedList
                  spacing={5}
                  listStyleType={"none"}
                  fontFamily={"Poppins"}
                  color={THEME.TEXT_COLORS}
               >
                  <Heading as={"h2"} fontSize={"xl"} fontWeight={500} py={2}>
                     Lista de Usuários
                  </Heading>
                  {users.map((user) => (
                     <ListItem
                        key={user.id}
                        shadow={"lg"}
                        p={2}
                        borderBottomWidth={1}
                        borderColor={"cyan.700"}
                     >
                        <Text fontWeight={600}>{user.username}</Text>
                     </ListItem>
                  ))}
               </UnorderedList>
            </Flex>
         </GridItem>

         <GridItem
            colSpan={{ lg: 8 }}
            bg={THEME.HOME.GRID_COL_BACKGROUND}
            rounded={"md"}
            p={1}
            boxShadow={"lg"}
         >
            <Flex></Flex>
         </GridItem>
      </Grid>
   );
}

export default memo(TableListItems);
