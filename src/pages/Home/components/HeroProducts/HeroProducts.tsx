import { memo } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";
import { ItemsProps } from "./[slug]/[items_props]";

function HeroProducts() {
   const { ITEMS_PROPS } = ItemsProps();
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
            {ITEMS_PROPS.map((item, i) => (
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
            ))}
         </Grid>
      </Flex>
   );
}

export default memo(HeroProducts);
