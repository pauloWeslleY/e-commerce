import { ReactNode, memo } from "react";
import { Flex } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";

const HeroTableWrapper = ({ children }: { children: ReactNode }) => {
   const { THEME } = useColors();

   return (
      <Flex
         flexDir={{ base: "row", md: "column" }}
         bg={THEME.DASHBOARD.TABLE_PRODUCT_LINE_BG}
      >
         {children}
      </Flex>
   );
};

export default memo(HeroTableWrapper);
