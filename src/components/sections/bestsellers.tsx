
"use client";

import React from 'react';
import { config } from '@/app/config.tsx';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { OrderForm } from '../order-form';
import { VisuallyHidden } from '../ui/visually-hidden.tsx';


const parsePrice = (price: string) => {
    // A bit naive, but should work for "Rs140", "Starting at Rs500", etc.
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

const BestSellerCard = ({ item, reverse = false }: { item: typeof config.bestsellers[0], reverse?: boolean }) => {
    const offeringItem = findItemInOfferings(item.name);
    const price = offeringItem?.price || 'N/A';
    const numericPrice = parsePrice(price);

    const getWhatsAppMessage = (details: Record<string, string>, transactionId: string) => {
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
        
        const paymentDetails = `\n\n*Payment Details:*\nTransaction ID: ${transactionId}`;
        
        const finalMessage = [messageHeader, orderItem, total, customerDetails, paymentDetails].join('\n');
        return encodeURIComponent(finalMessage);
    };

    return (
        <div
          className={cn(
            "flex flex-col md:flex-row items-center gap-8 md:gap-12",
            reverse && "md:flex-row-reverse"
          )}
        >
          <div className="w-full md:w-1/2 relative aspect-video overflow-hidden rounded-lg shadow-xl">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={600}
              height={338}
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
                        getWhatsAppMessage={getWhatsAppMessage}
                        totalPrice={numericPrice}
                    />
                </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
    )
}

export default function BestSellers() {
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bestsellers" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
            <VisuallyHidden>
                <h2>Our Best Sellers</h2>
            </VisuallyHidden>
            <h2 className="text-4xl md:text-5xl font-headline text-foreground">Our Best Sellers</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Discover the favorites that our customers can't get enough of.</p>
        </div>

        <div className="space-y-20">
          {config.bestsellers.map((item, index) => (
            <BestSellerCard key={item.name} item={item} reverse={index % 2 !== 0} />
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
