"use client";

import { ChakraProvider, ClientOnly } from "@chakra-ui/react";
import { ThemeProvider as NextThemesThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { themeSystem } from "./theme-system";
import useTheme from "./use-theme";

//------------------------------------------------------------------------------
// Theme Provider
//------------------------------------------------------------------------------

export type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme] = useTheme();

  return (
    <ChakraProvider value={themeSystem}>
      <NextThemesThemeProvider
        attribute="class"
        disableTransitionOnChange
        forcedTheme={theme}
      >
        <ClientOnly>{children}</ClientOnly>
      </NextThemesThemeProvider>
    </ChakraProvider>
  );
}
