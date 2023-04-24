import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

//* Configuration Dark Mode on App
const config: ThemeConfig = {
   initialColorMode: "dark",
   useSystemColorMode: true,
};

export const THEME = extendTheme({
   config,
   styles: {
      global: (props: any) => ({
         body: {
            bg: mode("whiteAlpha.800", "blackAlpha.800")(props),
            color: mode("gray.800", "whiteAlpha.800")(props)
         }
      })
   },
   fonts: {
      Poppins: `'Poppins', sans-serif`,
      Inter: `'Inter', sans-serif`
   }
});