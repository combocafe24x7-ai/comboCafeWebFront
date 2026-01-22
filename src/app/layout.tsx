
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/context/cart-provider';
import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import MobileBottomNav from '@/components/mobile/MobileBottomNav';

export const metadata = {
  title: 'Combo Cafe and Gift Shop',
  description: 'Your one-stop destination for delightful cakes, thoughtful gifts, and delicious food in Rampurhat.',
  icons: {
    icon: 'https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/image%20(1).png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className='flex-grow md:pt-0 pt-16'>
                {children}
              </main>
              <Footer />
            </div>
            <MobileBottomNav />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
