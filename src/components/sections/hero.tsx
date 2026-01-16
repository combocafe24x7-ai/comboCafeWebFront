
"use client";
import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { config } from '@/app/config';

export default function Hero() {
  return (
    <section id="home" className="bg-gray-50 pt-8 pb-8">
      <div className="container mx-auto">
        <Carousel
          opts={{ loop: true, align: 'start' }}
          plugins={[Autoplay({ delay: 5000 })]}
        >
          <CarouselContent className="-ml-2">
            {config.hero.banners.map((banner, index) => (
              <CarouselItem key={index} className="pl-2 md:basis-1/2 lg:basis-2/5">
                <div className="relative h-[280px] md:aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image src={banner.imageUrl} alt={banner.alt} layout="fill" objectFit="cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
