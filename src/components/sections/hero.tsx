"use client";
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';
import { config } from '@/app/config';
import { cn } from '@/lib/utils';

export default function Hero() {
  return (
    <section id="home" className="relative w-full md:mt-0 -mt-16">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
        opts={{
          loop: true,
          align: 'start',
        }}
      >
        <CarouselContent className="-ml-0">
          {config.hero.banners.map((banner, index) => (
            <CarouselItem key={index} className="pl-0 basis-full md:basis-full">
              <div className="relative aspect-[16/9] md:h-auto md:aspect-[16/7] w-full">
                <Image
                  src={banner.imageUrl}
                  alt={banner.alt}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </div>
      </Carousel>
    </section>
  );
}
