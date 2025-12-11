import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

//------------------------------------------------------------------------------
// Theme Config
//------------------------------------------------------------------------------

const themeConfig = defineConfig({
  theme: {
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
