
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


export default function Menu() {
  return (
    <section id="menu" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground">Our Menu</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Take a look at our full menu.</p>
        </div>

        <Carousel 
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: true,
                }),
            ]}
            className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-0">
            {config.menu.cards.map((menu, index) => (
              <CarouselItem key={index} className="pl-0 md:basis-1/2 lg:basis-1/3">
                <div className="p-0">
                  <Card className="overflow-hidden group rounded-none border-0">
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
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden sm:flex" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
