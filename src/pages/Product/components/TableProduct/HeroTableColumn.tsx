import { ReactNode, memo } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";

function HeroTableColumn({ children }: { children: ReactNode }) {
   const { THEME } = useColors();

   return (
      <SimpleGrid
         spacingY={3}
         columns={{ base: 1, md: 6 }}
         w={"full"}
         py={2}
         px={6}
         fontWeight={400}
         color={THEME.DASHBOARD.TABLE_PRODUCT_ITEM_COLORS}
         alignItems={"center"}
      >
         {children}
      </SimpleGrid>
   );
}

export default memo(HeroTableColumn);
