
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
import { OrderForm } from './order-form';

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

    const finalMessage = [header, items, total, customerDetails].join('\n') + `\n\nI have completed the payment. Please find the screenshot attached.`;
    return encodeURIComponent(finalMessage);
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
            Total Price: <span className="font-bold text-primary">Rs{totalPrice.toFixed(2)}</span>
            {totalDiscount > 0 && (
                <span className="ml-4 text-green-600 font-semibold">
                    (You save Rs{totalDiscount.toFixed(2)})
                </span>
            )}
        </SheetDescription>
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
                    <SheetClose asChild>
                        <Button variant="outline" onClick={handleClearCart}>
                            <Trash /><span>Empty Cart</span>
                        </Button>
                    </SheetClose>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                       <Button className="w-full">
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
                             getWhatsAppMessage={getWhatsAppMessage}
                             totalPrice={totalPrice}
                         />
                    </SheetContent>
                </Sheet>
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
