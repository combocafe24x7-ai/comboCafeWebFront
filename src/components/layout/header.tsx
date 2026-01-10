
"use client";

import { useState, useEffect } from 'react';
import { config } from '@/app/config.tsx';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon, ShoppingCart, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { useCart } from '@/context/cart-provider';
import { Badge } from '@/components/ui/badge';
import Cart from '@/components/cart';
import { useAccentColor } from '@/context/accent-color-provider';
import { VisuallyHidden } from '../ui/visually-hidden';

type HeaderProps = {
    onNavSelect: (path: string) => void;
}

type NavLink = {
  id: string;
  label: string;
  sublinks?: NavLink[];
};

export default function Header({ onNavSelect }: HeaderProps) {
  const [isSticky, setSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { cart } = useCart();
  const { accentColor } = useAccentColor();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleBrandClick = () => {
    window.location.reload();
  };

  const renderNavLinks = (links: NavLink[], isMobile = false): React.ReactNode[] => {
    return links.map(link => {
      const hasSublinks = link.sublinks && link.sublinks.length > 0;
      const isActive = activeSection === link.id;

      if (hasSublinks) {
        if (isMobile) {
          // Basic mobile dropdown - can be enhanced later if needed
           return (
            <div key={link.id}>
              <SheetClose asChild>
                <button
                  onClick={() => onNavSelect(link.id)}
                  className={cn(
                    'font-body font-semibold transition-colors w-full text-left p-4 text-lg',
                    isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                  )}
                >
                   <span style={isActive ? { color: accentColor } : {}}>{link.label}</span>
                </button>
              </SheetClose>
              <div className="pl-8">
                {link.sublinks?.map(sublink => (
                    <SheetClose key={sublink.id} asChild>
                        <button
                            onClick={() => onNavSelect(sublink.id)}
                            className="block w-full text-left p-3 text-md text-foreground/70 hover:text-foreground"
                        >
                            {sublink.label}
                        </button>
                    </SheetClose>
                ))}
              </div>
            </div>
          )
        }
        
        // Desktop nested dropdown
        return (
          <DropdownMenu key={link.id}>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'font-body font-semibold transition-colors flex items-center gap-1',
                  'text-sm',
                  isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                )}
                style={isActive ? { color: accentColor } : {}}
              >
                <span>{link.label}</span> <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {renderDropdownItems(link.sublinks!)}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }

      // Regular link
      const Comp = isMobile ? SheetClose : 'button';
      const clickHandler = () => onNavSelect(link.id);
      
      return (
        <Comp
          key={link.id}
          onClick={clickHandler}
          className={cn(
            'font-body font-semibold transition-colors',
            isMobile ? 'block w-full text-left p-4 text-lg' : 'text-sm',
            isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
          )}
        >
          <span style={isActive ? { color: accentColor } : {}}>{link.label}</span>
        </Comp>
      );
    })
  };
  
  const renderDropdownItems = (links: NavLink[]): React.ReactNode[] => {
    return links.map(link => {
      const hasSublinks = link.sublinks && link.sublinks.length > 0;
      if (hasSublinks) {
        return (
          <DropdownMenuSub key={link.id}>
            <DropdownMenuSubTrigger onClick={() => onNavSelect(link.id)}>
              <span>{link.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {renderDropdownItems(link.sublinks!)}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        );
      }
      return (
        <DropdownMenuItem key={link.id} onClick={() => onNavSelect(link.id)}>
          {link.label}
        </DropdownMenuItem>
      );
    });
  }


  const CartTrigger = () => (
     <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Open cart">
            <ShoppingCart />
            {cart.length > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-xs">{cart.length}</Badge>
            )}
        </Button>
    </SheetTrigger>
  );

  return (
    <header 
      className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', isSticky ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent')}
    >
      <nav className="container flex justify-between items-center px-4 md:px-6 py-3">
        <button 
          onClick={handleBrandClick} 
          className="text-xl font-headline font-bold transition-colors duration-300"
          style={{ color: accentColor }}
        >
          {config.brand.name}
        </button>
        <Sheet>
            <div className="hidden md:flex items-center space-x-6">
              {renderNavLinks(config.navigation.links)}
              <CartTrigger />
            </div>
            <SheetContent className="flex flex-col">
                <Cart />
            </SheetContent>
        </Sheet>
        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <CartTrigger />
            <SheetContent className="flex flex-col">
                <Cart />
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw]">
              <div className="flex flex-col h-full">
                <div className="py-4 border-b">
                  <span className="text-xl font-headline font-bold text-primary px-4" style={{ color: accentColor }}>
                    {config.brand.name}
                  </span>
                </div>
                <div className="flex-grow py-4">
                  {renderNavLinks(config.navigation.links, true)}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

    
