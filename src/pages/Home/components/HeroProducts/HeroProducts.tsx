import { memo, useEffect, useState } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";
import { useFetch } from "../../../../hooks/useFetch";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ProductsType } from "../../../../types/ProductType";
import { db } from "../../../../services/firebase";

function HeroProducts() {
   const [prodByCate, setProdByCate] = useState<ProductsType[]>([]);
   const { isCategories } = useFetch();
   const { THEME } = useColors();

   const filterProductsByCategory = async (id: string) => {
      const productCollectionsRef = collection(db, "product");
      const filteredProductsByCategory = query(
         productCollectionsRef,
         where("categoryId", "==", id)
      );

      const querySnapshot = await getDocs(filteredProductsByCategory);

      // Cria um array para armazenar os dados dos documentos
      const products: any[] = [];

      // Itera sobre cada documento e adiciona os dados ao array
      for (const doc of querySnapshot.docs) {
         const dataProduct = doc.data();
         // Adiciona os dados e informações adicionais ao array de produtos
         products.push({ ...dataProduct });
      }

      // Retorna o array de produtos
      return products;
   };

   const getProductsByCategory = async () => {
      const productByCategories = await filterProductsByCategory("Eletrônicos");

      setProdByCate(productByCategories);
   };

   console.log("PROD ==> ", prodByCate);

   useEffect(() => {
      getProductsByCategory();
   }, []);

   return (
      <Flex as={"section"} flexDir={"column"}>
         <Grid
            templateColumns={{
               base: "repeat(1, 1fr)",
               lg: "repeat(12, 1fr)",
            }}
            gap={2}
            as={"section"}
         >
            {prodByCate.map((props, i) => (
               <GridItem
                  key={i}
                  colSpan={{ lg: 3 }}
                  bg={THEME.HOME.BACKGROUND}
                  rounded={"md"}
                  boxShadow={"lg"}
               >
                  <Flex flexDir={"column"} align={"center"} gap={2} p={2}>
                     <h1>{props.name}</h1>
                  </Flex>
               </GridItem>
            ))}
         </Grid>
      </Flex>
   );
}

export default memo(HeroProducts);
