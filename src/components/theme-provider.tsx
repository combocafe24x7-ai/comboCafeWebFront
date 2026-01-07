
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { config } from "@/app/config.tsx";

function hexToHsl(hex: string): string {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialAccentColor = config.hero.categories[0].accentColor;
    
    // Set initial color
    root.style.setProperty('--primary', hexToHsl(initialAccentColor));
    
    // Create an observer to watch for changes on the --primary-hex variable
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const newHex = root.style.getPropertyValue('--primary-hex').trim();
          if (newHex) {
            root.style.setProperty('--primary', hexToHsl(newHex));
            root.style.setProperty('--ring', hexToHsl(newHex));
          }
        }
      }
    });

    observer.observe(root, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Force light theme and remove theme-switching capabilities
  return <NextThemesProvider {...props} forcedTheme="light">{children}</NextThemesProvider>
}
