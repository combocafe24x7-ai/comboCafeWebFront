
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
        <div className="relative aspect-[3/4] w-full">
            <Image
              src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hero%20images/ChatGPT%20Image%20Jan%2015,%202026,%2011_54_36%20PM.png"
              alt="Anniversary Gifts"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <h2 className="text-4xl font-serif font-bold tracking-tight">ANNIVERSARY GIFTS</h2>
              <p className="mt-2 text-lg">Perfect Products & Fresh Cakes</p>
              <Button asChild className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8" size="lg">
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
        >
          <CarouselContent>
            {config.hero.banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.alt}
                    layout="fill"
                    objectFit="cover"
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
