import { memo } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";
import { GetHandleProduct } from "./[slug]/[product_props]";
import { useFetch } from "../../../../hooks/useFetch";

function HeroProducts() {
   const { PRODUCT_PROPS } = GetHandleProduct();
   const { isCategories } = useFetch();
   const { THEME } = useColors();

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
            {isCategories.map((el) => {
               const filteredCategories = PRODUCT_PROPS.filter(
                  (props) => props.title === el.name
               );

               return filteredCategories.map((item, i) => (
                  <GridItem
                     key={i}
                     colSpan={{ lg: 3 }}
                     bg={THEME.HOME.BACKGROUND}
                     rounded={"md"}
                     boxShadow={"lg"}
                  >
                     <Flex flexDir={"column"} align={"center"} gap={2} p={2}>
                        <h1>{item.title}</h1>
                        <span>{item.label}</span>
                        <div>{item.element}</div>
                     </Flex>
                  </GridItem>
               ));
            })}
         </Grid>
      </Flex>
   );
}

export default memo(HeroProducts);
