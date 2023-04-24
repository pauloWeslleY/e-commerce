import { useColorModeValue } from "@chakra-ui/react";

export function useColors() {
   const THEME = {
      BACKGROUND: useColorModeValue("gray.50", "gray.900"),

      DASHBOARD: {
         BORDER_RIGHT_COLORS: useColorModeValue("gray.200", "gray.700"),
      },
   };

   return { THEME };
}
