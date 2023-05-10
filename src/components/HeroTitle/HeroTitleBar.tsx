import { memo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { NavTitle } from "../NavBar";
import { useColors } from "../../hooks/useColors";
import { NavBarProps } from "../../types/NavBarType";

function HeroTitleBar(props: NavBarProps) {
   const { THEME } = useColors();

   return (
      <Box
         as={"header"}
         my={4}
         p={2}
         rounded={"lg"}
         shadow={"md"}
         bg={THEME.HOME.BACKGROUND}
      >
         <Flex h={16}>
            <NavTitle label={props.label} icon={props.icon} />
         </Flex>
      </Box>
   );
}

export default memo(HeroTitleBar);
