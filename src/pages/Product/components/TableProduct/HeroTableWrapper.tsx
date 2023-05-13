import { ReactNode, memo } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";

interface HeroTableWrapperProps extends FlexProps {
   children: ReactNode;
}

const HeroTableWrapper = ({ children, ...rest }: HeroTableWrapperProps) => {
   const { THEME } = useColors();

   return (
      <Flex
         {...rest}
         flexDir={{ base: "row", md: "column" }}
         bg={THEME.DASHBOARD.TABLE_PRODUCT_LINE_BG}
      >
         {children}
      </Flex>
   );
};

export default memo(HeroTableWrapper);
