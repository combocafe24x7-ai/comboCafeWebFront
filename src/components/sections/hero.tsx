
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
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative w-full">
      {/* Mobile Hero */}
      <div className="md:hidden">
        <div className="relative h-[240px] w-full bg-background flex items-center justify-center overflow-hidden">
            <Image
              src={config.hero.banners[0].imageUrl}
              alt="Anniversary Gifts"
              layout="fill"
              objectFit="contain"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-4">
              <h2 className="text-4xl font-serif font-bold tracking-tight">ANNIVERSARY GIFTS</h2>
              <p className="mt-2 text-lg">Perfect Products & Fresh Cakes</p>
              <Button asChild className="mt-6 bg-transparent hover:bg-white/10 text-white border-white border rounded-full px-8 h-11" variant="outline" size="lg">
                <Link href="/gifts">Shop Now</Link>
              </Button>
            </div>
        </div>
      </div>

      {/* Desktop Hero */}
      <div className="hidden md:block">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full h-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {config.hero.banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[16/9] w-full">
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
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
       </div>
    </section>
  );
}
