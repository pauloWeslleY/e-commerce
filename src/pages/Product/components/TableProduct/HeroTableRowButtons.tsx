import { ReactNode, memo } from "react";
import { ButtonGroup, Flex } from "@chakra-ui/react";

function HeroTableRowButtons({ children }: { children: ReactNode }) {
   return (
      <Flex justify={{ md: "flex-end" }} gap={3}>
         <ButtonGroup size={"sm"} spacing={3}>
            {children}
         </ButtonGroup>
      </Flex>
   );
}

export default memo(HeroTableRowButtons);
