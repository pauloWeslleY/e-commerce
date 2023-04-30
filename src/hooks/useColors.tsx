import { useColorModeValue } from "@chakra-ui/react";

export function useColors() {
   const THEME = {
      BACKGROUND: useColorModeValue("gray.50", "gray.700"),
      TEXT_COLORS: useColorModeValue("gray.500", "gray.50"),
      SPAN_COLORS: useColorModeValue("blackAlpha.700", "whiteAlpha.900"),

      SIGN_IN: {
         BACKGROUND: useColorModeValue("blackAlpha.200", "blackAlpha.500"),
      },

      HOME: {
         CARDS_STATISTIC_BG_PROD: useColorModeValue("blue.100", "blue.200"),
         CARDS_STATISTIC_BG_CATE: useColorModeValue("teal.100", "teal.200"),
         CARDS_STATISTIC_BG_USERS: useColorModeValue(
            "purple.100",
            "purple.300"
         ),
         CARDS_STATISTIC_TEXT_COLORS: useColorModeValue(
            "blackAlpha.700",
            "whiteAlpha.900"
         ),
         GRID_COL_BACKGROUND: useColorModeValue(
            "whiteAlpha.600",
            "blackAlpha.400"
         ),
      },

      DASHBOARD: {
         BACKGROUND: useColorModeValue("blackAlpha.100", "gray.500"),
         BORDER_RIGHT_COLORS: useColorModeValue("gray.200", "gray.700"),

         TABLE_PRODUCT_ITEM_BG: useColorModeValue("blackAlpha.200", "gray.700"),
         TABLE_PRODUCT_TITLE_BG: useColorModeValue("gray.100", "gray.700"),
         TABLE_PRODUCT_LINE_BG: useColorModeValue("whiteAlpha.600", "gray.500"),
         TABLE_PRODUCT_TITLE_COLORS: useColorModeValue(
            "purple.900",
            "whiteAlpha.800"
         ),
         TABLE_PRODUCT_ITEM_COLORS: useColorModeValue(
            "purple.800",
            "purple.700"
         ),

         FORM_BACKGROUND: useColorModeValue("whiteAlpha.600", "purple.500"),
         FORM_FOOTER_BACKGROUND: useColorModeValue(
            "blackAlpha.100",
            "purple.800"
         ),
         FORM_LABEL_BACKGROUND: useColorModeValue("gray.700", "gray.50"),

         SIDE_BAR_BG: useColorModeValue("gray.50", "gray.700"),
         MOBILE_NAV_BG: useColorModeValue("whiteAlpha.900", "gray.700"),
         BORDER_COLOR_MOBILE_BG: useColorModeValue("purple.100", "purple.700"),

         MENU_LIST_BG: useColorModeValue("whiteAlpha.900", "gray.700"),
         MENU_LIST_BORDER_COLORS: useColorModeValue("purple.100", "purple.700"),

         INPUT_BAR_PLACEHOLDER_FOCUS_COLORS: useColorModeValue(
            "purple.700",
            "purple.300"
         ),
         INPUT_BAR_PLACEHOLDER_COLORS: useColorModeValue(
            "blackAlpha.400",
            "whiteAlpha.400"
         ),
      },

      TABLE: {
         TABLE_TEXT_COLORS: useColorModeValue("purple.800", "purple.600"),
      },

      BUTTONS: {
         IS_BUTTON_BACKGROUND: useColorModeValue(
            "whiteAlpha.400",
            "blackAlpha.300"
         ),
         IS_BUTTON_COLORS: useColorModeValue("purple.400", "purple.100"),
         IS_BUTTON_BORDER_COLORS: useColorModeValue("purple.400", "purple.100"),
      },
   };

   return { THEME };
}
