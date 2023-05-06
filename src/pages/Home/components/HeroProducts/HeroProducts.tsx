import { memo, useEffect, useState } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ProductsType } from "../../../../types/ProductType";
import { db } from "../../../../services/firebase";

function HeroProducts() {
   const [products, setProducts] = useState<ProductsType[]>([]);
   const itemCollectionsRef = collection(db, "items");

   useEffect(() => {
      const filteredGetItems = async () => {
         const filteredProducts = query(
            itemCollectionsRef,
            where("category", "==", "Electronics")
         );
         const querySnapshotItems = await getDocs(filteredProducts);
         const productsData = querySnapshotItems.docs.map<ProductsType>(
            (doc) => ({
               id: doc.id,
               ...doc.data(),
            })
         );

         setProducts(productsData);
      };

      filteredGetItems();
   }, []);

   return (
      <Flex flexDir={"column"} p={1}>
         <Stack>
            <Text as={"h2"} fontSize={"2xl"} fontWeight={500} py={2}>
               Produtos Eletrônicos
            </Text>
         </Stack>
         <Flex flexDir={"column"}>
            {products.map((props, index) => (
               <Box
                  key={`${props.id}${index}`}
                  borderBottomWidth={2}
                  borderColor={"purple.700"}
                  py={5}
               >
                  {props.title}
               </Box>
            ))}
         </Flex>
      </Flex>
   );
}

export default memo(HeroProducts);
