
"use client";
import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { config } from '@/app/config';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative h-[420px] md:h-[520px] flex items-center bg-background">
      <div className="absolute inset-0">
        <Image 
          src={config.hero.imageUrl} 
          alt="Anniversary Gifts" 
          layout="fill" 
          objectFit="cover" 
          objectPosition="right"
          priority 
          className="opacity-50 md:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-transparent to-background/20"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight text-text">
            {config.hero.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground font-ui">
            {config.hero.subtitle}
          </p>
          <Button asChild size="lg" className="mt-8 bg-transparent border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white transition-colors duration-300 shadow-lg" suppressHydrationWarning>
            <Link href={config.hero.buttonLink}>{config.hero.buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
