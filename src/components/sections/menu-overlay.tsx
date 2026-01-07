
"use client";

import Image from 'next/image';
import { config } from '@/app/config.tsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type MenuOverlayProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-sm z-[200] flex flex-col items-center justify-center transition-opacity duration-500", 
        isMounted ? 'opacity-100' : 'opacity-0'
    )}>
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-foreground/70 hover:text-foreground">
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="text-center mb-8 md:mb-12 animate-fade-in-down">
        <h2 className="text-4xl md:text-5xl font-headline text-foreground">Our Menu</h2>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">Take a look at our full menu.</p>
      </div>

      <div className={cn(
          "w-full max-w-7xl mx-auto transition-transform duration-700 delay-200 transform", 
          isMounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      )}>
        <Carousel 
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: true,
                }),
            ]}
            className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {config.menu.cards.map((menu, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div className="p-1">
                  <Card className="overflow-hidden group rounded-lg border-0 shadow-lg">
                    <CardContent className="p-0 flex items-center justify-center relative aspect-[3/4]">
                      <Image
                        src={menu.url}
                        alt={`Menu page ${index + 1}`}
                        fill
                        className="object-contain transform transition-transform duration-300 group-hover:scale-105"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 hidden lg:flex" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 hidden lg:flex" />
        </Carousel>
      </div>
    </div>
  );
}
