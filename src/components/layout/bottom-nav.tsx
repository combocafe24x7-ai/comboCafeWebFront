
"use client";

import { useState, useEffect } from 'react';
import { Home, LayoutGrid, BookOpen, Star, ShoppingCart, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-provider';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Cart from '@/components/cart';
import { useAccentColor } from '@/context/accent-color-provider';

type BottomNavProps = {
  onNavSelect: (path: string) => void;
};

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'offerings', label: 'Categories', icon: LayoutGrid },
  { id: 'bestsellers', label: 'Best Sellers', icon: Star },
  { id: 'menu', label: 'Menu', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Phone },
];

export default function BottomNav({ onNavSelect }: BottomNavProps) {
  const [activeSection, setActiveSection] = useState('home');
  const { cart } = useCart();
  const { displayColor } = useAccentColor();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newActiveSection = entry.target.id;
            // Best sellers is not a main section on mobile
            if (window.innerWidth < 768 && newActiveSection === 'bestsellers') return;
            setActiveSection(newActiveSection);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (id: string) => {
    onNavSelect(id);
  };
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                'flex flex-col items-center justify-center text-muted-foreground transition-colors duration-200 text-[10px] leading-tight w-14',
                isActive ? 'text-primary' : ''
              )}
               style={isActive ? { color: displayColor } : {}}
            >
              <item.icon className="h-5 w-5 mb-0.5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center text-muted-foreground relative text-[10px] leading-tight w-14">
              <ShoppingCart className="h-5 w-5 mb-0.5" />
              <span className="font-medium">Cart</span>
              {cart.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-0.5 h-4 w-4 rounded-full flex items-center justify-center text-[10px] p-0">{cart.length}</Badge>
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] flex flex-col">
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
