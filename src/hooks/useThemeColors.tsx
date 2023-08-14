import { useColorModeValue } from '@chakra-ui/react'

export function useThemeColors() {
  const THEME = {
    BACKGROUND: useColorModeValue('whiteAlpha.200', 'stone.950'),
    TEXT_COLORS: useColorModeValue('zinc.700', 'zinc.100'),
    SPAN_COLORS: useColorModeValue('blackAlpha.900', 'whiteAlpha.900'),

    LOGOTIPO_BACKGROUND: useColorModeValue('whiteAlpha.200', 'blackAlpha.100'),

    LOADING: {
      IS_LOADING_COLORS: useColorModeValue('whiteAlpha.50', 'blackAlpha.50'),
    },

    SIGN_IN: {
      BACKGROUND: useColorModeValue('whiteAlpha.200', 'blackAlpha.500'),
    },

    HOME: {
      BACKGROUND: useColorModeValue('whiteAlpha.600', 'blackAlpha.400'),
      CARDS_STATISTIC_BG_PROD: useColorModeValue('red.100', 'red.400'),
      CARDS_STATISTIC_BG_CATE: useColorModeValue('blue.100', 'blue.400'),
      CARDS_STATISTIC_BG_USERS: useColorModeValue('emerald.100', 'emerald.400'),
      CARDS_STATISTIC_TEXT_COLORS: useColorModeValue(
        'blackAlpha.700',
        'whiteAlpha.900'
      ),
    },

    DASHBOARD: {
      BACKGROUND: useColorModeValue('zinc.200', 'zinc.900'),

      //! SIDEBAR COLORS
      SIDE_BAR_BG: useColorModeValue('whiteAlpha.700', 'blackAlpha.400'),
      SIDE_BAR_COLORS: useColorModeValue('violet.600', 'violet.400'),
      SIDE_BAR_BG_ACTIVE: useColorModeValue('violet.500', 'violet.500'),
      SIDE_BAR_BG_ACTIVE_HOVER: useColorModeValue('violet.800', 'violet.300'),
      SIDEBAR_AVATAR_HERO_BORDER_COLORS: useColorModeValue(
        'violet.500',
        'violet.400'
      ),
      SIDEBAR_AVATAR_HERO_COLORS: useColorModeValue('zinc.400', 'zinc.600'),
      SIDE_BAR_TEXT_COLORS: useColorModeValue('zinc.800', 'violet.200'),

      //! TABLE COLORS
      TABLE_BACKGROUND: useColorModeValue('whiteAlpha.700', 'blackAlpha.400'),
      TABLE_TITLE_COLORS: useColorModeValue('violet.800', 'violet.600'),
      TABLE_COLORS: useColorModeValue('violet.800', 'violet.300'),

      //! HeroCategoryCard COLORS
      HERO_CATEGORY_CARD_BG: useColorModeValue(
        'whiteAlpha.500',
        'whiteAlpha.100'
      ),

      //! FORM COLORS
      FORM_BACKGROUND: useColorModeValue('whiteAlpha.500', 'blackAlpha.400'),
      FORM_PROFILE_BACKGROUND: useColorModeValue('whiteAlpha.500', 'zinc.900'),
      FORM_FOOTER_BACKGROUND: useColorModeValue(
        'blackAlpha.100',
        'blackAlpha.600'
      ),
      FORM_LABEL_COLORS: useColorModeValue('zinc.800', 'zinc.100'),
      INPUT_BAR_PLACEHOLDER_FOCUS_COLORS: useColorModeValue(
        'violet.700',
        'violet.500'
      ),
      INPUT_BAR_PLACEHOLDER_COLORS: useColorModeValue(
        'blackAlpha.400',
        'whiteAlpha.400'
      ),
    },

    BUTTONS: {
      BTN_ICON_COLORS: useColorModeValue('whiteAlpha.900', 'blackAlpha.800'),
      BTN_ICON_BACKGROUND: useColorModeValue(
        'blackAlpha.200',
        'whiteAlpha.100'
      ),
      IS_BUTTON_BACKGROUND: useColorModeValue(
        'whiteAlpha.400',
        'blackAlpha.900'
      ),
      IS_BUTTON_COLORS: useColorModeValue('violet.500', 'violet.400'),
      IS_BUTTON_COLORS_HOVER: useColorModeValue('violet.800', 'violet.600'),
    },
  }

  return { THEME }
}
