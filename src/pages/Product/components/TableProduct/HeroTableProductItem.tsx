import { memo, ReactNode } from "react";
import { Stack } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";

function HeroTableProductItem({ children }: { children: ReactNode }) {
   const { THEME } = useColors();

   return (
      <Stack
         direction={{ base: "column" }}
         bg={{ md: THEME.DASHBOARD.TABLE_PRODUCT_LINE_BG }}
         w={"full"}
         // shadow={"lg"}
      >
         {children}
      </Stack>
   );
}

export default memo(HeroTableProductItem);
