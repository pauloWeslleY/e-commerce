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
import { HeroProducts } from "../HeroProducts";

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
         as={"section"}
      >
         <GridItem
            colSpan={{ lg: 4 }}
            bg={THEME.HOME.BACKGROUND}
            rounded={"md"}
            boxShadow={"lg"}
            p={1}
         >
            <Flex
               as={"section"}
               flexDir={"column"}
               w={{ base: "full", md: "25vw" }}
               p={1}
            >
               <UnorderedList
                  spacing={5}
                  listStyleType={"none"}
                  fontFamily={"Poppins"}
                  color={THEME.TEXT_COLORS}
               >
                  <Heading as={"h2"} fontSize={"xl"} fontWeight={500} py={2}>
                     Usuários
                  </Heading>
                  {users.map((user, index) => (
                     <ListItem key={`${user.id}${index}`} p={2}>
                        <Text fontWeight={600}>{user.username}</Text>
                     </ListItem>
                  ))}
               </UnorderedList>
            </Flex>
         </GridItem>

         <GridItem
            colSpan={{ lg: 8 }}
            bg={THEME.HOME.BACKGROUND}
            rounded={"md"}
            boxShadow={"lg"}
            p={1}
         >
            <HeroProducts />
         </GridItem>
      </Grid>
   );
}

export default memo(TableListItems);
