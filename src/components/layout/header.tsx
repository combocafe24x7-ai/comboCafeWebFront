"use client";

import { useState, useEffect } from 'react';
import { config } from '@/app/config';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export default function Header() {
  const [isSticky, setSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    config.navigation.links.map(link => {
      const Comp = isMobile ? SheetClose : 'button';
      return (
        <Comp
          key={link.id}
          onClick={() => handleScrollTo(link.id)}
          className={cn(
            'font-body font-semibold transition-colors',
            isMobile ? 'block w-full text-left p-4 text-lg' : 'text-sm',
            activeSection === link.id ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
          )}
        >
          {link.label}
        </Comp>
      );
    })
  );

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', isSticky ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent')}>
      <nav className="container flex justify-between items-center px-4 md:px-6 py-3">
        <button onClick={() => handleScrollTo('home')} className="text-xl font-headline font-bold text-primary">
          {config.brand.name}
        </button>
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks />
          <ThemeToggle />
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw]">
              <div className="flex flex-col h-full">
                <div className="py-4 border-b">
                  <span className="text-xl font-headline font-bold text-primary px-4">
                    {config.brand.name}
                  </span>
                </div>
                <div className="flex-grow py-4">
                  <NavLinks isMobile />
                </div>
                <div className="p-4 border-t">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
