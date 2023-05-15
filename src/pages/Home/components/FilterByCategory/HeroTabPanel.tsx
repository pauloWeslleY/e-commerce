import { memo, useEffect, useState } from "react";
import { Flex, TabPanel, TabPanels } from "@chakra-ui/react";
import { filterProductsByCategory } from "../../../../utils/filterProductsByCategory";
import { ProductsType } from "../../../../types/ProductType";
import { useColors } from "../../../../hooks/useColors";

function HeroTabPanel() {
   const [prodByCategory, setProdByCategory] = useState<ProductsType[]>([]);
   const [automotive, setAutomotive] = useState<ProductsType[]>([]);
   const { THEME } = useColors();

   const getProductsByCategory = async () => {
      const productByCategories = await filterProductsByCategory("Eletrônicos");

      setProdByCategory(productByCategories);
   };

   const getCategoryAutomotive = async () => {
      const categoryAutomotive = await filterProductsByCategory("Automotivo");

      setAutomotive(categoryAutomotive);
   };

   useEffect(() => {
      getProductsByCategory();
      getCategoryAutomotive();
   }, []);

   return (
      <TabPanels>
         <TabPanel>
            {automotive.map((props, i) => (
               <Flex as={"article"} key={i} flexDir={"row"} gap={4} p={2}>
                  <Flex
                     bg={THEME.BACKGROUND}
                     p={1}
                     shadow={"lg"}
                     borderBottomColor={"purple.600"}
                     borderBottomWidth={1}
                     borderRadius={5}
                  >
                     <h3>{props.name}</h3>
                  </Flex>
               </Flex>
            ))}
         </TabPanel>
         <TabPanel>
            {prodByCategory.map((props, i) => (
               <Flex as={"article"} key={i} flexDir={"row"} gap={4} p={2}>
                  <Flex
                     bg={THEME.BACKGROUND}
                     p={1}
                     shadow={"lg"}
                     borderBottomColor={"purple.600"}
                     borderBottomWidth={1}
                     borderRadius={5}
                  >
                     <h3>{props.name}</h3>
                  </Flex>
               </Flex>
            ))}
         </TabPanel>
      </TabPanels>
   );
}

export default memo(HeroTabPanel);
