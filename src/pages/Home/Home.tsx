import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategory, BiUser } from "react-icons/bi";
import { useColors } from "../../hooks/useColors";
import { useFetch } from "../../hooks/useFetch";

import { Dashboard } from "../Dashboard/Dashboard";
import { CardStatistic } from "./components/CardStatistic";
import { TableListCategories } from "./components/TableListCategories";
import { query, orderBy, limit, collection } from "firebase/firestore";
import { db } from "../../services/firebase";

export function Home() {
   const { items, categories, users } = useFetch();
   const { THEME } = useColors();
   const prodCollectionRef = collection(db, "items");

   const q = query(prodCollectionRef, orderBy("name"), limit(3));

   console.log("items ==> ", q);

   return (
      <Dashboard>
         <Box px={4} py={4}>
            <Flex h={16} align={"center"} justify={"space-between"}>
               <Heading fontWeight={500} fontSize={"xl"}>
                  Home
               </Heading>
            </Flex>
         </Box>

         <Grid
            templateColumns={{
               base: "repeat(1, 1fr)",
               lg: "repeat(12, 1fr)",
            }}
            gap={10}
         >
            <GridItem colSpan={{ lg: 4 }}>
               <Flex>
                  <CardStatistic
                     icon={MdProductionQuantityLimits}
                     title="Produtos Cadastrados"
                     subtitle={items.length}
                     background={THEME.HOME.CARDS_STATISTIC_BG_PROD}
                  />
               </Flex>
            </GridItem>

            <GridItem colSpan={{ lg: 4 }}>
               <Flex>
                  <CardStatistic
                     icon={BiCategory}
                     title="Categorias"
                     subtitle={categories.length}
                     background={THEME.HOME.CARDS_STATISTIC_BG_CATE}
                  />
               </Flex>
            </GridItem>

            <GridItem colSpan={{ lg: 4 }}>
               <Flex>
                  <CardStatistic
                     icon={BiUser}
                     title="Usuários"
                     subtitle={users.length}
                     background={THEME.HOME.CARDS_STATISTIC_BG_USERS}
                  />
               </Flex>
            </GridItem>
         </Grid>

         <TableListCategories />
      </Dashboard>
   );
}
