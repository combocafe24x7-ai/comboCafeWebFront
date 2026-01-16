
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/context/cart-provider';
import React from 'react';
import MobileCartFab from '@/components/common/MobileCartFab';

export const metadata = {
  title: 'Ferns & Petals - Gifts, Cakes, Flowers',
  description: 'A one-stop-shop for gifts, cakes, flowers, and more for domestic delivery.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <CartProvider>
              {children}
              <MobileCartFab />
              <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
