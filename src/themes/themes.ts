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
            color: mode("blackAlpha.900", "whiteAlpha.900")(props),
            fontFamily: "'Poppins', sans-serif",
         },
      }),
   },
   fonts: {
      Poppins: `'Poppins', sans-serif`,
      Inter: `'Inter', sans-serif`,
   },
   colors: {
      gray: {
         700: "#121212",
         500: "#141517",
         400: "#9BA4B5",
      },
      purple: {
         800: "#7743DB",
         700: "#553C9A",
         600: "#6A64D9",
         500: "#A084DC",
         400: "#ADA2FF",
         200: "#BFACE2",
      },
   },
});
