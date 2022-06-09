import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

/**
 * Updates color mode based on system preference.
 * 
 * @see https://chakra-ui.com/docs/styled-system/features/color-mode#updating-the-theme-config
 */
const config: ThemeConfig = {
  initialColorMode: "dark",
  // useSystemColorMode: true,
};

export default extendTheme({ config });
