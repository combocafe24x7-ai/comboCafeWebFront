'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useCart, Product } from '@/context/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Plus, Minus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, addDays, startOfDay } from "date-fns";


type CartItemView = {
  product: Product;
  quantity: number;
}

export default function CheckoutPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [timeSlot, setTimeSlot] = useState("10-12");

  const cartItems = useMemo((): CartItemView[] => {
    const groupedItems: { [key: string]: CartItemView } = {};
    cart.forEach(item => {
      if (groupedItems[item.id]) {
        groupedItems[item.id].quantity++;
      } else {
        groupedItems[item.id] = { product: item, quantity: 1 };
      }
    });
    return Object.values(groupedItems);
  }, [cart]);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
  }, [cart]);
  
  const handleRemoveAllOfItem = (productId: string) => {
    removeFromCart(productId, true);
  }

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    
    if (cart.length === 0) {
      toast({
        variant: "destructive",
        title: "Your cart is empty",
        description: "Please add items to your cart before placing an order.",
      });
      return;
    }

    const deliveryDate = date ? format(date, "PPP") : "Not selected";
    const timeSlotMap: { [key: string]: string } = {
        '10-12': '10:00 AM - 12:00 PM',
        '12-14': '12:00 PM - 02:00 PM',
        '14-16': '02:00 PM - 04:00 PM',
        '16-18': '04:00 PM - 06:00 PM',
        '18-20': '06:00 PM - 08:00 PM',
    };

    toast({
      title: "Order Placed!",
      description: `Thank you, ${name}! Your order is confirmed for delivery on ${deliveryDate} during the ${timeSlotMap[timeSlot]} slot.`,
    });

    clearCart();
    router.push('/');
  };

  return (
    <>
      <Header />
      <main className="bg-gray-50 py-12">
        <div className="container mx-auto">
          <div className="mb-6">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shopping Cart ({cart.length} items)</CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500">Your cart is empty.</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {cartItems.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center gap-4 py-4">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-grow">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-500">{`Rs. ${product.price}`}</p>
                             <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 px-0" onClick={() => handleRemoveAllOfItem(product.id)}>
                                <Trash2 className="mr-1 h-4 w-4" />
                                Remove
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => removeFromCart(product.id)}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addToCart(product)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="font-semibold w-24 text-right">{`Rs. ${(parseFloat(product.price) * quantity).toFixed(2)}`}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{`Rs. ${total.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{`Rs. ${total.toFixed(2)}`}</span>
                  </div>
                </CardContent>
                <CardFooter>
                    <form onSubmit={handlePlaceOrder} className="w-full space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="John Doe" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" name="phone" type="tel" placeholder="9876543210" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address">Delivery Address</Label>
                            <Input id="address" name="address" placeholder="123 Main St, Rampurhat" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="landmark">Landmark</Label>
                            <Input id="landmark" name="landmark" placeholder="Near City Mall" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input id="pincode" name="pincode" type="text" placeholder="731235" maxLength={6} required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <Label htmlFor="date">Delivery Date</Label>
                              <Popover>
                                  <PopoverTrigger asChild>
                                      <Button
                                          variant={"outline"}
                                          className={cn(
                                              "w-full justify-start text-left font-normal",
                                              !date && "text-muted-foreground"
                                          )}
                                      >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                                      </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                      <Calendar
                                          mode="single"
                                          selected={date}
                                          onSelect={setDate}
                                          disabled={(day) =>
                                            day < addDays(startOfDay(new Date()), 1) || day > addDays(new Date(), 30)
                                          }
                                          initialFocus
                                      />
                                  </PopoverContent>
                              </Popover>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="time">Delivery Time</Label>
                              <Select value={timeSlot} onValueChange={setTimeSlot}>
                                  <SelectTrigger id="time">
                                      <SelectValue placeholder="Select a time slot" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="10-12">10:00 AM - 12:00 PM</SelectItem>
                                      <SelectItem value="12-14">12:00 PM - 02:00 PM</SelectItem>
                                      <SelectItem value="14-16">02:00 PM - 04:00 PM</SelectItem>
                                      <SelectItem value="16-18">04:00 PM - 06:00 PM</SelectItem>
                                      <SelectItem value="18-20">06:00 PM - 08:00 PM</SelectItem>
                                  </SelectContent>
                              </Select>
                          </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={cart.length === 0}>
                            Place Order
                        </Button>
                    </form>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
