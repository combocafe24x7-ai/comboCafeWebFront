"use client";

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';

type CollectionItem = {
  id?: string;
  title: string;
  imageUrl: string;
  description?: string;
  price?: string;
};

type HorizontalCollectionProps = {
  title: string;
  items: CollectionItem[];
  bgColor?: string;
  viewAllLink?: string;
};

const CollectionCard = ({ item }: { item: CollectionItem }) => {
    const phoneNumber = "918436860216";
    const { toast } = useToast();
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const handleSendToWhatsapp = () => {
        if (!transactionId) {
            toast({
                variant: "destructive",
                title: "Transaction ID is required",
                description: "Please enter the transaction ID after payment.",
            });
            return;
        }

        const whatsappMessage = `
*New Single Item Order from Combo Cafe Website*

*Order Item:*
- ${item.title}

*Order Total: Rs. ${item.price}*

*Payment Information:*
Transaction ID: *${transactionId}*
        `.trim().replace(/^\s+/gm, '');
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank');
        
        setIsQrModalOpen(false);
        setTransactionId('');
        toast({
            title: "Order details sent!",
            description: "Your order has been sent via WhatsApp. We will confirm shortly.",
        });
    };

    return (
    <>
        <Card className="overflow-hidden group border-0 rounded-lg shadow-sm flex flex-col h-full">
            <CardContent className="p-0 flex-grow">
                <Link href={`/search?q=${encodeURIComponent(item.title)}`} className="block">
                    <div className="relative aspect-[4/5]">
                    <Image 
                        src={item.imageUrl} 
                        alt={item.title} 
                        layout="fill" 
                        className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="font-semibold text-lg text-white truncate">{item.title}</h4>
                        {item.description && <p className="text-xs text-gray-200 mt-1 truncate">{item.description}</p>}
                    </div>
                    </div>
                </Link>
                {item.price && (
                <div className="p-3 bg-white">
                    <p className="font-semibold text-gray-900 text-sm">{`Rs. ${item.price}`}</p>
                </div>
                )}
            </CardContent>
            <div className="p-3 pt-0 bg-white space-y-2">
                {item.price ? (
                    <Button onClick={() => setIsQrModalOpen(true)} variant="secondary" className="w-full text-xs text-center" size="sm" suppressHydrationWarning>
                        Order on WhatsApp
                    </Button>
                ) : (
                    <Button asChild variant="secondary" className="w-full text-xs text-center" size="sm" suppressHydrationWarning>
                       <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`I'd like to inquire about: ${item.title}`)}`} target="_blank" rel="noopener noreferrer">
                           Inquire on WhatsApp
                       </a>
                   </Button>
                )}
                <Button asChild variant="outline" className="w-full text-xs text-center" size="sm" suppressHydrationWarning>
                    <a href={`tel:+${phoneNumber}`}>
                        Call to Order
                    </a>
                </Button>
          </div>
        </Card>

        {item.price && (
            <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Scan to Pay for {item.title}</DialogTitle>
                    <DialogDescription>
                      1. Scan the QR code to pay Rs. {item.price}.
                      <br />
                      2. Enter the transaction ID below.
                      <br />
                      3. Click confirm to place your order via WhatsApp.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center justify-center py-4">
                    <Image
                      src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/qr/qr%20code.jpeg"
                      alt="Payment QR Code"
                      width={250}
                      height={250}
                      className="rounded-md ring-1 ring-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`transactionId-collection-${item.id || item.title}`}>Transaction ID</Label>
                    <Input
                      id={`transactionId-collection-${item.id || item.title}`}
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter payment transaction ID"
                      required
                      suppressHydrationWarning
                    />
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <Button onClick={handleSendToWhatsapp} className="w-full" suppressHydrationWarning>
                      Confirm and Place Order via WhatsApp
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
        )}
    </>
    );
};

export default function HorizontalCollection({ title, items, bgColor = 'bg-white', viewAllLink = '#' }: HorizontalCollectionProps) {
  return (
    <section className={bgColor}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <Button variant="outline" asChild>
            <Link href={viewAllLink}>View All</Link>
          </Button>
        </div>
        <Carousel
            opts={{
                align: "start",
                slidesToScroll: "auto",
            }}
             className="w-full"
        >
            <CarouselContent className="-ml-4">
                {items.map((item, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/4 lg:basis-1/5">
                        <div className="h-full">
                            <CollectionCard item={item} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10" />
        </Carousel>
      </div>
    </section>
  );
}
