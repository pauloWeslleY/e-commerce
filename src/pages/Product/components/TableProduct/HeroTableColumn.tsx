import { ReactNode, memo } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";
import { ProductsType } from "../../../../types/ProductType";
import { ModalProductHero } from "../ModalProductHero";
import {
   HeroTableRowButtons,
   HeroTableRowSpan,
   HeroTableRowSpanID,
} from "./index";

interface HeroTableColumnProps {
   product: ProductsType;
   children: ReactNode;
}

function HeroTableColumn({ children, product }: HeroTableColumnProps) {
   const { THEME } = useColors();

   return (
      <SimpleGrid
         spacingY={3}
         columns={{ base: 1, md: 6 }}
         w={"full"}
         py={3}
         px={6}
         fontWeight={400}
         alignItems={"center"}
         color={THEME.DASHBOARD.TABLE_PRODUCT_COLORS}
      >
         <HeroTableRowSpanID>{product.id}</HeroTableRowSpanID>
         <HeroTableRowSpan>{product.name}</HeroTableRowSpan>
         <HeroTableRowSpan>R${product.price}</HeroTableRowSpan>
         <HeroTableRowSpan>{product.quantity} uni</HeroTableRowSpan>
         <HeroTableRowSpan>{product.category}</HeroTableRowSpan>
         <HeroTableRowButtons>
            <ModalProductHero items={product} />
            {children}
         </HeroTableRowButtons>
      </SimpleGrid>
   );
}

export default memo(HeroTableColumn);
