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

export default function Hero() {
  return (
    <section id="home" className="relative w-full">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent className="ml-0">
            {config.hero.banners.map((banner, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="relative aspect-[16/9] w-full md:aspect-video">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.alt}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
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
