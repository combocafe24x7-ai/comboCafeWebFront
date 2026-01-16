"use client";
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { useCart } from '@/context/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  badge?: string;
};

type ProductSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  items: Product[];
  bgColor?: string;
  viewAllLink?: string;
  showViewAll?: boolean;
};

const ProductCard = ({ item }: { item: Product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const phoneNumber = "918436860216";
  
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleAddToCart = () => {
    addToCart(item);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

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
- ${item.name}

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
      <Card className="overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300 border-0 rounded-lg flex flex-col">
        <CardContent className="p-0 flex-grow">
          <Link href={`/search?q=${encodeURIComponent(item.name)}`} className="flex flex-col h-full">
            <div className="relative aspect-square">
              <Image 
                src={item.imageUrl} 
                alt={item.name} 
                layout="fill" 
                className="object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              {item.badge && (
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">{item.badge}</Badge>
              )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h4 className="font-medium text-sm text-gray-800 truncate">{item.name}</h4>
              <p className="text-xs text-gray-500 mt-1 h-4 truncate">{item.description}</p>
              <p className="font-semibold text-gray-900 mt-auto pt-2">{`Rs. ${item.price}`}</p>
            </div>
          </Link>
        </CardContent>
        <div className="p-4 pt-0 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAddToCart} variant="outline" className="w-full text-xs text-center" size="sm" suppressHydrationWarning>
              Add to Cart
            </Button>
            <Button onClick={() => setIsQrModalOpen(true)} variant="secondary" className="w-full text-xs text-center" size="sm" suppressHydrationWarning>
                Order on WhatsApp
            </Button>
          </div>
          <Button asChild variant="outline" className="w-full text-xs text-center" size="sm" suppressHydrationWarning>
              <a href={`tel:+${phoneNumber}`}>
                  Call to Order
              </a>
          </Button>
        </div>
      </Card>
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan to Pay for {item.name}</DialogTitle>
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
            <Label htmlFor={`transactionId-${item.id}`}>Transaction ID</Label>
            <Input
              id={`transactionId-${item.id}`}
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
    </>
  );
};

export default function ProductSection({ id, title, subtitle, items, bgColor = 'bg-white', viewAllLink = "#", showViewAll = true }: ProductSectionProps) {
  return (
    <section id={id} className={bgColor}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-semibold">{title}</h2>
            {subtitle && <p className="text-md text-gray-500 mt-1">{subtitle}</p>}
          </div>
           {showViewAll && viewAllLink && <Button variant="outline" asChild>
            <Link href={viewAllLink}>View All</Link>
          </Button>}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
