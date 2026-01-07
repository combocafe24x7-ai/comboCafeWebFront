
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { config } from "@/app/config.tsx";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    const root = window.document.documentElement;
    // Set a static accent color from your config
    const heroCategory = config.hero.categories[0]; // Or some other logic
    if (heroCategory) {
      // This will be handled by inline styles in the hero component.
      // root.style.setProperty('--primary-hex', heroCategory.accentColor);
    }
  }, []);

  // Force light theme and remove theme-switching capabilities
  return <NextThemesProvider {...props} forcedTheme="light">{children}</NextThemesProvider>
}
