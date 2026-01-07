
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { X, Phone } from 'lucide-react';
import { config } from '@/app/config.tsx';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { OrderForm } from '../order-form';

type BestSellersOverlayProps = {
    isOpen: boolean;
    onClose: () => void;
};

const WhatsAppIcon = (props: React.ComponentProps<'svg'>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="WhatsApp"
    >
      <path d="M16.75 13.96c.25.13.42.2.46.3.05.1.05.75-.2 1.3-.25.55-1.12 1.1-1.52 1.25-.4.15-1.07.13-1.6-.08s-2.15-1-3.6-2.5c-1.15-1.15-2-2.5-2.2-2.9-.2-.4-.04-.6.12-.77.16-.17.35-.2.5-.2s.33.02.47.22c.14.2.3.66.35.7.05.05.07.12.02.2-.05.08-.1.18-.2.25-.1.08-.2.12-.25.2-.06.07-.12.15-.05.27.07.12.33.56.7.92.56.5.94.75 1.1.8.14.05.24.03.32-.03.1-.06.42-.5.54-.66.12-.17.22-.15.32-.1.1.04.65.3.75.36zM12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c1.85 0 3.55-.5 5-1.35l-1.3-1.3c-1.1.5-2.35.8-3.7.8a8 8 0 1 1 8-8c0 1.35-.3 2.6-.8 3.7l1.3 1.3C21.5 15.55 22 13.85 22 12A10 10 0 0 0 12 2z"/>
    </svg>
);

const parsePrice = (price: string) => {
    const match = price.match(/(\d+(\.\d+)?)/);
    if (!match) return 0;
    return parseFloat(match[0]);
}

const findItemInOfferings = (name: string) => {
    for (const category in config.offerings) {
        const cat = config.offerings[category as keyof typeof config.offerings];
        if (Array.isArray(cat)) {
            const found = cat.find(item => item.name === name);
            if (found) return found;
        } else {
            for (const subCategory in cat) {
                const subCat = cat[subCategory as keyof typeof cat] as any;
                 if (subCat.items && Array.isArray(subCat.items)) {
                    const found = subCat.items.find((item: any) => item.name === name);
                    if (found) return found;
                } else {
                    for (const subSubCat in subCat) {
                        const subSubCatData = subCat[subSubCat as keyof typeof subCat];
                        if (subSubCatData.items && Array.isArray(subSubCatData.items)) {
                            const found = subSubCatData.items.find((item: any) => item.name === name);
                            if(found) return found;
                        }
                    }
                }
            }
        }
    }
    return null;
}

const BestSellerCard = ({ item }: { item: typeof config.bestsellers[0] }) => {
    const offeringItem = findItemInOfferings(item.name);
    const price = offeringItem?.price || 'N/A';
    const numericPrice = parsePrice(price);

    const handleWhatsAppOrder = (details: Record<string, string>) => {
        const messageHeader = `I'd like to place an order for the following best seller:\n\n*Order Summary:*`;
        const orderItem = `- ${item.name} (${price})`;
        const total = `\n*Total: ${price}*`;

        const customerDetails = `\n\n*Delivery Details:*\n` +
            `Name: ${details.firstName} ${details.lastName}\n` +
            `Phone: ${details.phoneNumber}\n` +
            (details.emailId ? `Email: ${details.emailId}\n` : '') +
            `Address: ${details.address}\n` +
            (details.houseNumber ? `  House No: ${details.houseNumber}\n` : '') +
            (details.streetNumber ? `  Street: ${details.streetNumber}\n` : '') +
            `  Landmark: ${details.landmarks}\n` +
            `  Pincode: ${details.pincode}\n` +
            `Delivery Date: ${details.deliveryDate}\n` +
            `Delivery Time: ${details.deliveryHours}`;
        
        const message = encodeURIComponent([messageHeader, orderItem, total, customerDetails].join('\n'));
        const url = `https://wa.me/${config.contact.phone}?text=${message}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
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
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="secondary" size="lg" className="bg-blue-400 text-white hover:bg-blue-500 hover:animate-pulse">
                                Order on WhatsApp
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[90vw] sm:max-w-lg overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Delivery Information</SheetTitle>
                                <SheetDescription>
                                    Please provide your details to place an order for <span className="font-bold">{item.name}</span>.
                                </SheetDescription>
                            </SheetHeader>
                            <OrderForm 
                                onSubmit={handleWhatsAppOrder}
                                totalPrice={numericPrice}
                            />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}

export default function BestSellersOverlay({ isOpen, onClose }: BestSellersOverlayProps) {
  const [isMounted, setIsMounted] = useState(false);

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
            <h2>Our Best Sellers</h2>
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
                        <BestSellerCard key={item.name} item={item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

    