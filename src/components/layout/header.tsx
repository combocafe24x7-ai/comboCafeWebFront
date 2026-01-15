"use client";
import React from 'react';
import Image from 'next/image';
import { ChevronDown, MapPin, Search, ShoppingBag } from 'lucide-react';
import { config } from '@/app/config';
import { useCart } from '@/context/cart-provider';
import { Button } from '../ui/button';

const TopUtilityBar = () => (
  <div className="bg-gray-100 text-gray-600 text-xs py-1.5">
    <div className="container mx-auto flex justify-center items-center">
      <p>{config.header.utilityBar.promoText}</p>
    </div>
  </div>
);

const MainHeader = () => {
  const { cart } = useCart();
  return (
    <div className="bg-background border-b">
      <div className="container mx-auto flex items-center py-4 gap-8">
        {/* Logo */}
        <a href="#" className="shrink-0">
          <span className="text-xl font-bold text-gray-800">combo cafe and gift shop</span>
        </a>
        
        {/* Location & Search */}
        <div className="flex-grow flex items-center border rounded-md">
          <div className="flex items-center p-2 border-r cursor-pointer hover:bg-gray-50">
            <MapPin className="h-5 w-5 text-gray-500" />
            <input 
              type="text" 
              defaultValue="Mumbai" 
              className="w-24 ml-2 bg-transparent focus:outline-none text-sm"
            />
            <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
          </div>
          <div className="flex-grow flex items-center p-2">
            <input 
              type="text"
              placeholder="Search for gifts, cakes, flowers..."
              className="w-full bg-transparent focus:outline-none text-sm placeholder-gray-400"
            />
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Search className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>
        
        {/* Action Icons */}
        <div className="flex items-center space-x-6">
          <a href="#" className="relative flex flex-col items-center text-gray-600 hover:text-gray-900">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xs mt-1">Cart</span>
            {cart.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {cart.length}
              </div>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

const CategoryNavigation = () => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="bg-background shadow-sm sticky top-0 z-40">
            <div className="container mx-auto">
                <div ref={scrollContainerRef} className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {config.header.navLinks.map((link) => (
                        <a 
                            key={link.id} 
                            href={link.href}
                            className="text-sm font-medium text-gray-700 pb-1 border-b-2 border-transparent hover:border-primary hover:text-gray-900 transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function Header() {
  return (
    <header>
      <TopUtilityBar />
      <MainHeader />
      <CategoryNavigation />
    </header>
  );
}
