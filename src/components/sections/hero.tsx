
"use client";
import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { config } from '@/app/config';

export default function Hero() {
  return (
    <section id="home" className="bg-gray-50 pt-4 md:pt-6 pb-6">
      <div className="container mx-auto">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
        >
          <CarouselContent>
            {config.hero.banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[220px] sm:h-[280px] md:aspect-video md:h-auto rounded-lg overflow-hidden bg-gray-100">
                  <Image src={banner.imageUrl} alt={banner.alt} layout="fill" objectFit="contain" />
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
