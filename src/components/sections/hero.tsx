
"use client";

import React, { useState, useEffect, useRef, useContext } from 'react';
import { config } from '@/app/config.tsx';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { OfferingCategory } from './offerings';
import { useAccentColor } from '@/context/accent-color-provider';

type HeroProps = {
  onExplore: (category: OfferingCategory) => void;
};

export default function Hero({ onExplore }: HeroProps) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [parallaxStyle, setParallaxStyle] = useState<React.CSSProperties>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { setAccentColor } = useAccentColor();
  
  const currentCategory = config.hero.categories[currentCategoryIndex];

  useEffect(() => {
    setAccentColor(currentCategory.accentColor);
  }, [currentCategory, setAccentColor]);

  const changeCategory = (direction: 'next' | 'prev') => {
    if (isChanging) return;
    setIsChanging(true);
    setTimeout(() => {
      setCurrentCategoryIndex(prev => {
        const total = config.hero.categories.length;
        if (direction === 'next') {
          return (prev + 1) % total;
        } else {
          return (prev - 1 + total) % total;
        }
      });
      setTimeout(() => setIsChanging(false), 300);
    }, 300);
  };
  
  const resetInterval = () => {
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
        changeCategory('next');
    }, 5000);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scale = 1 + scrollY * 0.0003;
      const translateY = scrollY * 0.3;
      setParallaxStyle({
        transform: `scale(${scale}) translateY(${translateY}px) translateZ(0)`,
        willChange: 'transform'
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    resetInterval();

    return () => {
        window.removeEventListener('scroll', handleScroll);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };
  }, []);
  
  const handleManualChange = (direction: 'next' | 'prev') => {
    changeCategory(direction);
    resetInterval();
  }

  const handleScrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const PrimaryButton = () => (
    <Button 
        size="lg" 
        onClick={() => onExplore(currentCategory.id as OfferingCategory)} 
        className="font-semibold shadow-lg hover:shadow-xl transition-shadow text-primary-foreground"
    >
      {config.hero.primaryCta.text}
    </Button>
  );

  const SecondaryButton = () => (
    <Button size="lg" variant="outline" onClick={() => handleScrollTo(config.hero.secondaryCta.href)} className="border-2 text-white border-white/80 bg-black/20 hover:bg-white/20 backdrop-blur-sm">
      {config.hero.secondaryCta.text}
    </Button>
  );

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <Image
        src={config.hero.backgroundUrl}
        alt="Hero background"
        fill
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={parallaxStyle}
        priority
      />
      
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="text-left">
          <div className={cn('transition-all duration-300 ease-in-out', isChanging ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0')}>
            <h2 className="text-sm font-body uppercase tracking-widest" style={{ color: currentCategory.accentColor }}>{currentCategory.subtitle}</h2>
            <h1 className="font-headline text-5xl md:text-7xl font-bold my-4 leading-tight" style={{ color: currentCategory.accentColor }}>{currentCategory.headline}</h1>
            <p className="font-body text-lg text-white/80 max-w-md hidden md:block">{currentCategory.description}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-start">
              <PrimaryButton />
              <SecondaryButton />
            </div>
          </div>
        </div>

        {/* Right Side Navigation (Desktop Only) */}
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex items-center space-x-4 md:space-x-6">
          <div className="text-right">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <p className={cn("font-mono text-5xl font-bold transition-opacity duration-300", isChanging ? 'opacity-0' : 'opacity-100')}>
                0{currentCategoryIndex + 1}
              </p>
              {isChanging && <div className="absolute w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>}
            </div>
            <p className="font-body text-sm uppercase tracking-widest text-white/70">/ 0{config.hero.categories.length}</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white rounded-full backdrop-blur-sm" onClick={() => handleManualChange('prev')} aria-label="Previous category">
              <ArrowUp />
            </Button>
            <div className="h-16 w-px bg-white/30" />
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white rounded-full backdrop-blur-sm" onClick={() => handleManualChange('next')} aria-label="Next category">
              <ArrowDown />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
