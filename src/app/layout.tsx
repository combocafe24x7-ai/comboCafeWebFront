
"use client";

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { config } from './config.tsx';
import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/context/cart-provider';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { AccentColorProvider } from '@/context/accent-color-provider';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [heroAccentColor, setHeroAccentColor] = useState(config.hero.categories[0].accentColor);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <title>{config.brand.name}</title>
        <meta name="description" content="A cozy yet premium café experience offering handcrafted cakes, fresh flowers, and thoughtful gifts." />
      </head>
      <body 
        className="font-body"
        style={{ '--hero-accent-color': heroAccentColor } as React.CSSProperties}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <CartProvider>
            <AccentColorProvider initialColor={heroAccentColor} onSetColor={setHeroAccentColor}>
              {children}
              <Toaster />
            </AccentColorProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
