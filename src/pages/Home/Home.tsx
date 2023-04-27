import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategory, BiUser } from "react-icons/bi";
import { useColors } from "../../hooks/useColors";
import { useFetch } from "../../hooks/useFetch";

import { Dashboard } from "../Dashboard/Dashboard";
import { CardStatistic } from "./components/CardStatistic";

export function Home() {
   const { THEME } = useColors();
   const { items, categories, users } = useFetch();

   return (
      <Dashboard>
         <Grid templateColumns={"repeat(12, 1fr)"} columnGap={2}>
            <Flex as={GridItem} colSpan={4}>
               <CardStatistic
                  icon={MdProductionQuantityLimits}
                  title="Produtos Cadastrados"
                  subtitle={items.length}
                  background={THEME.HOME.CARDS_STATISTIC_BG_PROD}
               />
            </Flex>
            <Flex as={GridItem} colSpan={4}>
               <CardStatistic
                  icon={BiCategory}
                  title="Categorias"
                  subtitle={categories.length}
                  background={THEME.HOME.CARDS_STATISTIC_BG_CATE}
               />
            </Flex>
            <Flex as={GridItem} colSpan={4}>
               <CardStatistic
                  icon={BiUser}
                  title="Usuários"
                  subtitle={users.length}
                  background={THEME.HOME.CARDS_STATISTIC_BG_USERS}
               />
            </Flex>
         </Grid>
      </Dashboard>
   );
}
