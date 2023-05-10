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
   items: ProductsType;
   children: ReactNode;
}

function HeroTableColumn({ children, items }: HeroTableColumnProps) {
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
         <HeroTableRowSpanID>{items.id}</HeroTableRowSpanID>
         <HeroTableRowSpan>{items.title}</HeroTableRowSpan>
         <HeroTableRowSpan>R${items.price}</HeroTableRowSpan>
         <HeroTableRowSpan>{items.quantity} uni</HeroTableRowSpan>
         <HeroTableRowSpan>{items.category}</HeroTableRowSpan>
         <HeroTableRowButtons>
            <ModalProductHero items={items} />
            {children}
         </HeroTableRowButtons>
      </SimpleGrid>
   );
}

export default memo(HeroTableColumn);
