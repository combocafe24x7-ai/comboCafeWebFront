
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, MapPin, Search, ShoppingBag, User } from 'lucide-react';
import { config } from '@/app/config';
import { useCart } from '@/context/cart-provider';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "@/components/ui/popover"

type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  badge?: string;
};

const allProducts: Product[] = [
  ...config.productSections.bestSellingCakes,
  ...config.productSections.allCakes,
  ...config.productSections.gifts,
  ...config.productSections.personalisedFrames,
  ...config.productSections.personalisedMugsAndCushions,
  ...config.collections.cakes.map(c => ({...c, id: c.id || c.title, name: c.title, price: c.price || '0', description: c.description || ''})),
  ...config.productSections.foodItems,
];


const TopUtilityBar = () => (
  <div className="bg-gray-100 text-gray-600 text-xs py-1.5">
    <div className="container mx-auto flex justify-end items-center">
      <p>{config.header.utilityBar.promoText}</p>
    </div>
  </div>
);

const MainHeader = () => {
  const { cart } = useCart();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allProducts.filter(product => {
        const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term);
        const productName = product.name.toLowerCase();
        return searchTerms.some(term => productName.includes(term));
      });
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
      setIsPopoverOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsPopoverOpen(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPopoverOpen(false);
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = () => {
    setIsPopoverOpen(false);
  };


  return (
    <div className="bg-background border-b">
      <div className="container mx-auto flex items-center py-4 gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-xl font-bold text-gray-800">combo cafe and gift shop</span>
        </Link>
        
        {/* Location & Search */}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <form onSubmit={handleSearchSubmit} className="flex-grow flex items-center border rounded-md relative">
            <a href="https://google.com/maps/place/Combo+Cafe+%26+Gifts+Shop/data=!4m2!3m1!1s0x0:0x20d4a8fe5d070ebc?sa=X&ved=1t:2428&ictx=111" target="_blank" rel="noopener noreferrer" className="flex items-center p-2 border-r cursor-pointer hover:bg-gray-50">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div className="ml-2 bg-transparent focus:outline-none text-sm">
                Rampurhat
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
            </a>
            <PopoverAnchor asChild>
              <div className="flex-grow flex items-center p-2">
                <input 
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for gifts, cakes, flowers..."
                  className="w-full bg-transparent focus:outline-none text-sm placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />
                <Button type="submit" variant="ghost" size="icon" className="w-8 h-8">
                  <Search className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </PopoverAnchor>
          </form>

           <PopoverContent 
             onOpenAutoFocus={(e) => e.preventDefault()}
             className="w-[--radix-popover-trigger-width] mt-1"
           >
              <div className="space-y-2">
                {suggestions.map((product) => (
                  <Link
                    key={product.id}
                    href={`/search?q=${encodeURIComponent(product.name)}`}
                    className="block p-2 -m-2 rounded-md hover:bg-accent"
                    onClick={handleSuggestionClick}
                  >
                    <p className="text-sm font-medium truncate">{product.name}</p>
                  </Link>
                ))}
              </div>
          </PopoverContent>
        </Popover>
        
        {/* Action Icons */}
        <div className="flex items-center space-x-6">
          <Link href="/checkout" className="relative flex flex-col items-center text-gray-600 hover:text-gray-900">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xs mt-1">Cart</span>
            {cart.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {cart.length}
              </div>
            )}
          </Link>
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
