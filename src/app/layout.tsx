
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/context/cart-provider';
import React from 'react';
import Header from '@/components/layout/header';
import MobileBottomNav from '@/components/mobile/MobileBottomNav';

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
              <Header />
              <div className='md:pt-0 pt-28'>
                {children}
              </div>
              <MobileBottomNav />
              <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

    