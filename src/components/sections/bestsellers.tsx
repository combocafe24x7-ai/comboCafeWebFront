
"use client";

import React from 'react';
import { config } from '@/app/config.tsx';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BestSellers() {
  const whatsAppUrl = `https://wa.me/${config.contact.phone}?text=I'd like to order one of your best sellers!`;
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bestsellers" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground">Our Best Sellers</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Discover the favorites that our customers can't get enough of.</p>
        </div>

        <div className="space-y-20">
          {config.bestsellers.map((item, index) => (
            <div
              key={item.name}
              className={cn(
                "flex flex-col md:flex-row items-center gap-8 md:gap-12",
                index % 2 !== 0 && "md:flex-row-reverse"
              )}
            >
              <div className="w-full md:w-1/2 relative aspect-video overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  data-ai-hint={item.imageHint}
                />
              </div>

              <div className="w-full md:w-1/2 text-center md:text-left">
                <span className="text-primary font-bold tracking-wider uppercase">{item.tag}</span>
                <h3 className="font-headline text-3xl md:text-4xl text-foreground mt-2">{item.name}</h3>
                <p className="text-muted-foreground mt-4 font-body max-w-md mx-auto md:mx-0">{item.description}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
                   <Button asChild size="lg" className="hover:animate-pulse">
                      <a href={`tel:${config.contact.phone}`}>
                          <Phone /><span>Call to Order</span>
                      </a>
                  </Button>
                  <Button asChild variant="secondary" size="lg" className="bg-blue-400 text-white hover:bg-blue-500 hover:animate-pulse">
                      <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                          <span>Order on WhatsApp</span>
                      </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
            <Button size="lg" variant="outline" onClick={() => handleScrollTo('menu')}>
                <span>Go to Menu</span>
            </Button>
        </div>
      </div>
    </section>
  );
}
