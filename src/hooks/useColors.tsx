import { useColorModeValue } from "@chakra-ui/react";

export function useColors() {
   const THEME = {
      BACKGROUND: useColorModeValue("gray.50", "gray.700"),
      TEXT_COLORS: useColorModeValue("gray.500", "whiteAlpha.800"),
      SPAN_COLORS: useColorModeValue("blackAlpha.700", "whiteAlpha.900"),

      SIGN_IN: {
         BACKGROUND: useColorModeValue("blackAlpha.200", "blackAlpha.500"),
      },

      HOME: {
         BACKGROUND: useColorModeValue("whiteAlpha.600", "blackAlpha.400"),
         CARDS_STATISTIC_BG_PROD: useColorModeValue("red.100", "red.200"),
         CARDS_STATISTIC_BG_CATE: useColorModeValue("blue.100", "blue.200"),
         CARDS_STATISTIC_BG_USERS: useColorModeValue("teal.100", "teal.300"),
         CARDS_STATISTIC_TEXT_COLORS: useColorModeValue(
            "blackAlpha.700",
            "whiteAlpha.900"
         ),
      },

      DASHBOARD: {
         BACKGROUND: useColorModeValue("blackAlpha.100", "gray.600"),
         TEXT_COLORS: useColorModeValue("gray.500", "purple.100"),
         BORDER_RIGHT_COLORS: useColorModeValue("gray.200", "gray.700"),

         /*
            ! NOTE: SideBar Colors
         */
         SIDE_BAR_BG: useColorModeValue("whiteAlpha.900", "gray.900"),
         SIDE_BAR_COLORS: useColorModeValue("purple.600", "purple.400"),
         SIDE_BAR_TITLE_COLORS: useColorModeValue("purple.700", "purple.100"),
         SIDEBAR_AVATAR_HERO_BORDER_COLORS: useColorModeValue(
            "purple.600",
            "purple.400"
         ),
         SIDEBAR_AVATAR_HERO_COLORS: useColorModeValue("gray.600", "gray.100"),
         SIDEBAR_ICON_BG: useColorModeValue("purple.700", "purple.100"),
         MOBILE_NAV_BG: useColorModeValue("whiteAlpha.900", "gray.700"),
         BORDER_COLOR_MOBILE_BG: useColorModeValue("purple.100", "purple.700"),

         //! TABLE COLORS
         TABLE_PRODUCT_HEADER_BG: useColorModeValue(
            "blackAlpha.200",
            "gray.800"
         ),
         TABLE_PRODUCT_LINE_BG: useColorModeValue("whiteAlpha.600", "gray.600"),
         TABLE_PRODUCT_TITLE_COLORS: useColorModeValue(
            "purple.900",
            "whiteAlpha.800"
         ),
         TABLE_PRODUCT_COLORS: useColorModeValue("purple.800", "purple.700"),

         POPOVER_BACKGROUND: useColorModeValue("whiteAlpha.600", "gray.700"),

         /*
            ! NOTE: Form Colors
         */
         FORM_BACKGROUND: useColorModeValue("whiteAlpha.600", "gray.600"),
         FORM_FOOTER_BACKGROUND: useColorModeValue(
            "blackAlpha.100",
            "blackAlpha.400"
         ),
         FORM_LABEL_BACKGROUND: useColorModeValue("gray.700", "whiteAlpha.900"),
         INPUT_BAR_PLACEHOLDER_FOCUS_COLORS: useColorModeValue(
            "purple.700",
            "purple.800"
         ),
         INPUT_BAR_PLACEHOLDER_COLORS: useColorModeValue(
            "blackAlpha.400",
            "whiteAlpha.400"
         ),

         MENU_LIST_BG: useColorModeValue("whiteAlpha.900", "gray.700"),
         MENU_LIST_BORDER_COLORS: useColorModeValue("purple.100", "purple.700"),
      },

      TABLE_USERS: {
         TABLE_BACKGROUND: useColorModeValue("transparent", "gray.600"),
         TABLE_TITLE_COLORS: useColorModeValue("purple.800", "purple.300"),
         TABLE_TEXT_COLORS: useColorModeValue("purple.800", "purple.600"),
      },

      BUTTONS: {
         BTN_ICON_BACKGROUND: useColorModeValue(
            "blackAlpha.200",
            "whiteAlpha.100"
         ),
         IS_BUTTON_BACKGROUND: useColorModeValue(
            "whiteAlpha.400",
            "blackAlpha.900"
         ),
         IS_BUTTON_COLORS: useColorModeValue("purple.600", "purple.400"),
         IS_BUTTON_COLORS_HOVER: useColorModeValue("purple.800", "purple.600"),
      },
   };

   return { THEME };
}
