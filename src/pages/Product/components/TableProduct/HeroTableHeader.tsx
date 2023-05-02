import { memo } from "react";
import { SimpleGrid, chakra } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";

function HeroTableHeader() {
   const TABLE_HEADER = ["ID", "Nome", "Preço", "Quantidade", "Categorias"];
   const { THEME } = useColors();

   return (
      <SimpleGrid
         spacingY={3}
         columns={{ base: 1, md: 6 }}
         w={{ base: 230, md: "full" }}
         textTransform={"uppercase"}
         bg={THEME.DASHBOARD.TABLE_PRODUCT_ITEM_BG}
         color={THEME.DASHBOARD.TABLE_PRODUCT_TITLE_COLORS}
         py={{ base: 1, md: 4 }}
         px={{ base: 2, md: 10 }}
         fontSize={"md"}
         fontWeight={600}
         alignItems={"center"}
      >
         {TABLE_HEADER.map((item, i) => (
            <span key={i}>{item}</span>
         ))}
         <chakra.span textAlign={{ md: "right" }}>Ações</chakra.span>
      </SimpleGrid>
   );
}

export default memo(HeroTableHeader);
