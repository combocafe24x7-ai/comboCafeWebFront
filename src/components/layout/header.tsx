
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Search, ShoppingCart, Menu, X, Phone } from 'lucide-react';
import { config } from '@/app/config';
import { useCart } from '@/context/cart-provider';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileSearch from '../mobile/MobileSearch';


type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  badge?: string;
};

const allProducts: Product[] = Array.from(new Set([ // Use Set to remove duplicates
  ...config.productSections.bestSellingCakes,
  ...config.productSections.allCakes,
  ...config.productSections.gifts,
  ...config.collections.cakes.map(c => ({...c, id: c.id || c.title, name: c.title, price: c.price || '0', description: c.description || ''})),
  ...config.productSections.foodItems,
]));


const TopUtilityBar = () => (
  <div className="bg-gray-100 text-gray-600 text-xs py-1.5 hidden md:block">
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
    <div className="bg-background border-b hidden md:block">
      <div className="container mx-auto flex items-center py-4 gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-xl font-bold text-gray-800">Combo Cafe and Gift Shop</span>
        </Link>
        
        {/* Search */}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <form onSubmit={handleSearchSubmit} className="flex-grow flex items-center border rounded-md relative">
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
                  suppressHydrationWarning
                />
                <Button type="submit" variant="ghost" size="icon" className="w-8 h-8" suppressHydrationWarning>
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
            <ShoppingCart className="h-6 w-6" />
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

const MobileHeader = () => {
    const { cart } = useCart();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background shadow-sm flex flex-col p-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="-ml-2" suppressHydrationWarning>
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-3/4">
                            <SheetHeader>
                                <SheetTitle className="text-left">
                                    <Link href="/" onClick={() => setIsSheetOpen(false)}>
                                        <span className="text-xl font-bold text-gray-800">Combo Cafe</span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="mt-8 flex flex-col gap-4">
                                {(config.header.navLinks as any[]).map((link) => (
                                     link.subLinks ? (
                                        <div key={link.id}>
                                            <p className="text-lg font-medium text-gray-700">{link.label}</p>
                                            <div className="flex flex-col gap-2 pl-4 mt-2">
                                                {link.subLinks.map((subLink:any) => (
                                                    <a 
                                                        key={subLink.id} 
                                                        href={subLink.href}
                                                        onClick={() => setIsSheetOpen(false)}
                                                        className="text-base text-gray-600 hover:text-primary"
                                                    >
                                                        {subLink.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <a 
                                            key={link.id} 
                                            href={link.href}
                                            onClick={() => setIsSheetOpen(false)}
                                            className="text-lg font-medium text-gray-700 hover:text-primary"
                                        >
                                            {link.label}
                                        </a>
                                    )
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="shrink-0">
                      <span className="text-lg font-bold text-gray-800">Combo Cafe</span>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/checkout" className="relative text-gray-600">
                        <ShoppingCart className="h-6 w-6" />
                        {cart.length > 0 && (
                            <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                                {cart.length}
                            </div>
                        )}
                        <span className="sr-only">Cart</span>
                    </Link>
                </div>
            </div>
            <MobileSearch />
        </div>
    )
}

const CategoryNavigation = () => {
    return (
        <div className="bg-background shadow-sm sticky top-0 z-40 hidden md:block">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {(config.header.navLinks as any[]).map((link) => (
                            link.subLinks ? (
                                <DropdownMenu key={link.id}>
                                    <DropdownMenuTrigger asChild>
                                        <button suppressHydrationWarning className="flex items-center gap-1 text-sm font-medium text-gray-700 pb-1 border-b-2 border-transparent hover:border-primary hover:text-gray-900 transition-colors duration-200 cursor-pointer focus-visible:outline-none">
                                            {link.label}
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {link.subLinks.map((subLink: any) => (
                                            <Link href={subLink.href} passHref key={subLink.id} legacyBehavior>
                                                <DropdownMenuItem asChild>
                                                    <a className="cursor-pointer">{subLink.label}</a>
                                                </DropdownMenuItem>
                                            </Link>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    className="text-sm font-medium text-gray-700 pb-1 border-b-2 border-transparent hover:border-primary hover:text-gray-900 transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            )
                        ))}
                    </div>
                    {config.header.phoneNumber && (
                        <div className="flex items-center gap-2 pl-6 shrink-0">
                            <Phone className="h-4 w-4 text-primary" />
                            <a href={`tel:${config.header.phoneNumber.replace(/\s/g, '')}`} className="text-sm font-medium text-gray-700 hover:text-primary whitespace-nowrap">
                                Call to order: {config.header.phoneNumber}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function Header() {
  return (
    <header>
      {/* Desktop Header */}
      <div className='hidden md:block'>
        <TopUtilityBar />
        <MainHeader />
        <CategoryNavigation />
      </div>

      {/* Mobile Header */}
      <div className='md:hidden'>
        <MobileHeader />
      </div>
    </header>
  );
}
