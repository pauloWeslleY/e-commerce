import { memo } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";
import { HeroProducts } from "../HeroProducts";
import { HeroUsersList } from "../HeroUsersList";

function TableListItems() {
   const { THEME } = useColors();

   return (
      <Grid
         templateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(12, 1fr)",
         }}
         gap={9}
         my={6}
         as={"section"}
      >
         <GridItem
            colSpan={{ lg: 4 }}
            bg={THEME.HOME.BACKGROUND}
            rounded={"md"}
            boxShadow={"lg"}
         >
            <HeroUsersList />
         </GridItem>

         <GridItem colSpan={{ lg: 8 }}>
            <HeroProducts />
         </GridItem>
      </Grid>
   );
}

export default memo(TableListItems);
