import {
   Flex,
   Grid,
   GridItem,
   Heading,
   ListItem,
   Text,
   UnorderedList,
} from "@chakra-ui/react";
import { memo } from "react";
import { useFetch } from "../../../../hooks/useFetch";

function TableListCategories() {
   const { users } = useFetch();

   return (
      <Grid
         my={6}
         templateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(12, 1fr)",
         }}
         gap={2}
      >
         <GridItem colSpan={{ lg: 4 }}>
            <Flex
               as={"section"}
               flexDir={"column"}
               w={{ base: "full", md: "20vw" }}
               p={4}
            >
               <UnorderedList spacing={5} listStyleType={"none"}>
                  <Heading as={"h2"} fontSize={"xl"} fontWeight={500} py={2}>
                     Lista de Usuarios
                  </Heading>
                  {users.map((user) => (
                     <ListItem
                        key={user.id}
                        shadow={"lg"}
                        p={6}
                        borderWidth={1}
                        borderColor={"purple.700"}
                        borderRadius={3}
                     >
                        <Text fontWeight={600}>{user.username}</Text>
                     </ListItem>
                  ))}
               </UnorderedList>
            </Flex>
         </GridItem>

         <GridItem colSpan={{ lg: 8 }}>
            <Flex>sgsrdfgarweg</Flex>
         </GridItem>
      </Grid>
   );
}

export default memo(TableListCategories);
