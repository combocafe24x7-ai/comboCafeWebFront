
"use client";

import Image from 'next/image';
import { useCart } from '@/context/cart-provider';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { config } from '@/app/config.tsx';
import { Phone, MessageCircle, Trash, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const getWhatsAppMessage = () => {
    const header = "I'd like to place an order for the following items:\n\n";
    const items = cart.map(item => `- ${item.name} (${item.price})`).join('\n');
    return encodeURIComponent(header + items);
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <Separator />
      {cart.length > 0 ? (
        <div className="flex-1 flex flex-col">
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
            <Separator />
            <SheetFooter className="mt-auto pt-6 grid grid-cols-1 gap-4">
                <div className='grid grid-cols-2 gap-2'>
                    <Button asChild className="w-full">
                        <a href={`tel:${config.contact.phone}`}>
                            <Phone /> Call to Order
                        </a>
                    </Button>
                    <Button asChild variant="secondary" className="w-full">
                        <a href={`https://wa.me/${config.contact.phone}?text=${getWhatsAppMessage()}`} target="_blank" rel="noopener noreferrer">
                            <MessageCircle /> WhatsApp
                        </a>
                    </Button>
                </div>
                <SheetClose asChild>
                    <Button variant="outline" onClick={handleClearCart}>
                        <Trash /> Empty Cart
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
