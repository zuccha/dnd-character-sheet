import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

//------------------------------------------------------------------------------
// Theme Config
//------------------------------------------------------------------------------

const themeConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          "cs.divider": color("gray.300", "gray.500"),
          "cs.frame": color("gray.50", "gray.700"),
          "cs.page": color("gray.200", "gray.800"),
          "highlight": color("blue.200", "blue.500"),
          "highlight.hover": color("blue.300", "blue.400"),
          "hover": color("gray.200", "gray.950"),
          "l1": color("gray.50", "gray.800"),
          "l2": color("gray.100", "gray.900"),
          "l3": color("gray.200", "gray.950"),
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
// Semantic Token
//------------------------------------------------------------------------------

function color(
  light: string,
  dark: string,
): { value: { _dark: string; _light: string } } {
  return { value: { _dark: `{colors.${dark}}`, _light: `{colors.${light}}` } };
}
