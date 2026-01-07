
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { X, Phone } from 'lucide-react';
import { config } from '@/app/config.tsx';
import { cn } from '@/lib/utils';

type BestSellersOverlayProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function BestSellersOverlay({ isOpen, onClose }: BestSellersOverlayProps) {
  const [isMounted, setIsMounted] = useState(false);
  const whatsAppUrl = `https://wa.me/${config.contact.phone}?text=I'd like to order one of your best sellers!`;

  useEffect(() => {
    setIsMounted(isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-sm z-[200] flex flex-col items-center justify-start transition-opacity duration-300", 
        isMounted ? 'opacity-100' : 'opacity-0'
    )}>
        <VisuallyHidden>
            <DialogTitle>Our Best Sellers</DialogTitle>
        </VisuallyHidden>

        <div className="absolute top-4 right-4 z-10">
            <Button variant="ghost" size="icon" onClick={onClose} className="text-foreground/70 hover:text-foreground">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
            </Button>
        </div>

        <div className={cn(
            "w-full h-full overflow-y-auto transition-transform duration-500 transform",
            isMounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        )}>
            <div className="container mx-auto px-6 py-20">
                <div className="text-center mb-12 animate-fade-in-down">
                    <h2 className="text-4xl md:text-5xl font-headline text-foreground">Our Best Sellers</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Discover the favorites that our customers can't get enough of.</p>
                </div>

                <div className="space-y-16">
                    {config.bestsellers.map((item) => (
                        <div
                            key={item.name}
                            className="flex flex-col items-center gap-8 animate-fade-in-down"
                            style={{ animationDelay: '200ms' }}
                        >
                            <div className="w-full max-w-md relative aspect-video overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={item.imageHint}
                                />
                            </div>

                            <div className="w-full text-center">
                                <span className="text-primary font-bold tracking-wider uppercase">{item.tag}</span>
                                <h3 className="font-headline text-3xl text-foreground mt-2">{item.name}</h3>
                                <p className="text-muted-foreground mt-3 font-body max-w-md mx-auto">{item.description}</p>
                                <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
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
            </div>
        </div>
    </div>
  );
}
