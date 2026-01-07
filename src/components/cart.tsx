
"use client";

import Image from 'next/image';
import { useCart } from '@/context/cart-provider';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetContent, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { config } from '@/app/config.tsx';
import { Phone, Trash, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge.tsx';
import { VisuallyHidden } from './ui/visually-hidden.tsx';
import { OrderForm } from './order-form';

// A custom component for the WhatsApp icon
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
    // Removes "Rs", commas, and trims whitespace, then converts to a number
    if (typeof price !== 'string') return 0;
    const cleanedPrice = price.replace(/Rs\.?/i, '').replace(/,/g, '').trim();
    const numericPrice = parseFloat(cleanedPrice);
    return isNaN(numericPrice) ? 0 : numericPrice;
};

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();

  const handleRemoveFromCart = (name: string) => {
    removeFromCart(name);
    toast({
        title: "Item removed",
        description: `${name} has been removed from your cart.`,
    });
  }

  const handleClearCart = () => {
    clearCart();
    toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
    });
  }
  
  const totalPrice = cart.reduce((total, item) => total + parsePrice(item.price), 0);
  const totalDiscount = cart.reduce((total, item) => {
    if (item.originalPrice) {
      const original = parsePrice(item.originalPrice);
      const current = parsePrice(item.price);
      if (original > current) {
        return total + (original - current);
      }
    }
    return total;
  }, 0);


  const getWhatsAppMessage = (details: Record<string, string>) => {
    const header = `I'd like to place an order for the following items:\n\n*Order Summary:*`;
    const items = cart.map(item => `- ${item.name} (${item.price})`).join('\n');
    const total = `\n*Total: Rs${totalPrice.toFixed(2)}*`;
    
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

    return encodeURIComponent([header, items, total, customerDetails].join('\n'));
  }

  const handleWhatsAppOrder = (details: Record<string, string>) => {
    const message = getWhatsAppMessage(details);
    const url = `https://wa.me/${config.contact.phone}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <SheetHeader>
        <VisuallyHidden>
            <SheetTitle>Cart</SheetTitle>
        </VisuallyHidden>
        <SheetTitle>Your Cart</SheetTitle>
        {totalPrice > 0 && (
             <SheetDescription>
                Total Price: <span className="font-bold text-primary">Rs{totalPrice.toFixed(2)}</span>
                {totalDiscount > 0 && (
                    <span className="ml-4 text-green-600 font-semibold">
                        (You save Rs{totalDiscount.toFixed(2)})
                    </span>
                )}
            </SheetDescription>
        )}
      </SheetHeader>
      <Separator />
      {cart.length > 0 ? (
        <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 -mx-6">
                <div className="px-6">
                    {cart.map((item, index) => (
                    <div key={`${item.name}-${index}`} className="flex items-center gap-4 py-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover"/>
                        </div>
                        <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">{item.price}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveFromCart(item.name)}>
                        <X />
                        </Button>
                    </div>
                    ))}
                </div>
            </ScrollArea>
            <Separator className='-mx-6 w-[calc(100%+48px)]' />
            <SheetFooter className="mt-auto pt-6 grid grid-cols-1 gap-4">
                <div className='grid grid-cols-2 gap-2'>
                    <Button asChild className="w-full">
                        <a href={`tel:${config.contact.phone}`}>
                            <Phone /><span>Call to Order</span>
                        </a>
                    </Button>
                    <Sheet>
                       <SheetTrigger asChild>
                           <Button variant="secondary" className="w-full bg-blue-400 text-white hover:bg-blue-500 hover:animate-pulse">
                               Order on WhatsApp
                           </Button>
                       </SheetTrigger>
                       <SheetContent side="right" className="w-[90vw] sm:max-w-lg overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Delivery Information</SheetTitle>
                                <SheetDescription>
                                    Please provide your details to place the order.
                                </SheetDescription>
                            </SheetHeader>
                            <OrderForm
                                onSubmit={handleWhatsAppOrder} 
                                totalPrice={totalPrice}
                            />
                       </SheetContent>
                    </Sheet>
                </div>
                <SheetClose asChild>
                    <Button variant="outline" onClick={handleClearCart}>
                        <Trash /><span>Empty Cart</span>
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <SheetClose asChild>
                <Button className="mt-4">Continue Shopping</Button>
            </SheetClose>
        </div>
      )}
    </>
  );
}

    

    