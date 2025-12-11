import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

//------------------------------------------------------------------------------
// Theme Config
//------------------------------------------------------------------------------

const themeConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          "cs.frame": gray("50", "700"),
          "cs.page": gray("200", "800"),
          "l1": gray("50", "800"),
          "l2": gray("100", "900"),
          "l3": gray("200", "950"),
        },
      },
    },
    tokens: {
      fontSizes: {
        "cs.h1": { value: "2em" },
        "cs.h2": { value: "1.5em" },
        "cs.h3": { value: "1.5em" },
        "cs.h4": { value: "1.1em" },
        "cs.value.md": { value: "1.7em" },
      },
    },
  },
});

//------------------------------------------------------------------------------
// Theme System
//------------------------------------------------------------------------------

export const themeSystem = createSystem(defaultConfig, themeConfig);

//------------------------------------------------------------------------------
// Gray Utility Function
//------------------------------------------------------------------------------

function gray(
  light: string,
  dark: string,
): { value: { _dark: string; _light: string } } {
  return {
    value: { _dark: `{colors.gray.${dark}}`, _light: `{colors.gray.${light}}` },
  };
}
