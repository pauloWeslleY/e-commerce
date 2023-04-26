import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategory, BiUser } from "react-icons/bi";
import { useColors } from "../../hooks/useColors";

import { Dashboard } from "../Dashboard/Dashboard";
import { CardStatistic } from "./components/CardStatistic";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ProductsType } from "../../types/ProductType";
import { db } from "../../services/firebase";

export function Home() {
   const [items, setItems] = useState<ProductsType[]>([]);
   const { THEME } = useColors();
   const prodCollectionRef = collection(db, "items");

   console.log("Products ==>", items);

   useEffect(() => {
      const getItems = async () => {
         const data = await getDocs(prodCollectionRef);
         const items = data.docs.map<ProductsType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         console.log("Prod =>", items);
         setItems(items);
      };
      getItems();
   }, []);

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
                  subtitle="7500"
                  background={THEME.HOME.CARDS_STATISTIC_BG_CATE}
               />
            </Flex>
            <Flex as={GridItem} colSpan={4}>
               <CardStatistic
                  icon={BiUser}
                  title="Usuários"
                  subtitle="1500"
                  background={THEME.HOME.CARDS_STATISTIC_BG_USERS}
               />
            </Flex>
         </Grid>
      </Dashboard>
   );
}
