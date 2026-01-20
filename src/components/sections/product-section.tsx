"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useCart } from '@/context/cart-provider';
import { Calendar as CalendarIcon, Heart, Phone, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { format, addDays, startOfDay } from "date-fns";
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
import { Separator } from '../ui/separator';
import { config } from '@/app/config';

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
  title?: string;
  subtitle?: string;
  items: Product[];
  bgColor?: string;
  viewAllLink?: string;
  showViewAll?: boolean;
  prioritizeImages?: boolean;
};

const ProductCard = ({ item, priority }: { item: Product; priority?: boolean }) => {
    const { toast } = useToast();
    const { addToCart } = useCart();
    const phoneNumber = "8436860216";

    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
    const [timeSlot, setTimeSlot] = useState("10-12");
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        landmark: '',
        pincode: '',
    });
    
    const cardId = item.id || item.name;

    const handleAddToCart = () => {
        addToCart(item);
        toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
        });
    };

    const handleWishlistClick = () => {
        toast({
        title: "Added to wishlist!",
        description: `${item.name} has been added to your wishlist.`,
        });
    }

    const handleQuickViewClick = () => {
        toast({
        title: "Coming Soon!",
        description: "Quick view functionality will be available shortly.",
        });
    }

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSendToWhatsapp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!transactionId || transactionId.length < 10) {
            toast({
                variant: "destructive",
                title: "Valid Transaction ID is required",
                description: "Please enter a transaction ID of at least 10 characters.",
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

        const whatsappMessage = `
*New Single Item Order from Combo Cafe Website*

*Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Email: ${customerDetails.email}

*Delivery Details:*
Address: ${customerDetails.address}${customerDetails.landmark ? `, ${customerDetails.landmark}` : ''}, ${customerDetails.pincode}
Date: ${deliveryDate}
Time Slot: ${timeSlotMap[timeSlot]}

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
        setCustomerDetails({ name: '', email: '', phone: '', address: '', landmark: '', pincode: '' });
        toast({
            title: "Order details sent!",
            description: "Your order has been sent via WhatsApp. We will confirm shortly.",
        });
    };

  return (
    <>
        <Card className="overflow-hidden group bg-card shadow-card border-0 rounded-card flex flex-col h-full">
        <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-t-card bg-background">
            <Image
                src={item.imageUrl}
                alt={item.name}
                layout="fill"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={priority}
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                <Button onClick={handleWishlistClick} variant="outline" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white border-0 rounded-full shadow-md" suppressHydrationWarning>
                    <Heart className="w-4 h-4 text-gray-700" />
                </Button>
                <Button onClick={handleQuickViewClick} variant="outline" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white border-0 rounded-full shadow-md" suppressHydrationWarning>
                    <Search className="w-4 h-4 text-gray-700" />
                </Button>
                </div>
            </div>
            {item.badge && (
            <div className="absolute top-0 left-0 bg-primary/90 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-br-lg">
                {item.badge}
            </div>
            )}
        </div>

        <CardContent className="p-3 md:p-4 flex flex-col flex-grow bg-card rounded-b-card">
            <h3 className="font-sans font-semibold text-text text-sm leading-tight line-clamp-2 h-10">
            {item.name}
            </h3>
            
            <div className="h-9">
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.description || '\u00A0' /* Non-breaking space to preserve height */}
                </p>
            </div>

            <div className="mt-auto pt-2">
                <p className="font-sans font-bold text-base text-primary-dark">{`Rs. ${item.price}`}</p>
                <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                        <Button onClick={handleAddToCart} variant="secondary" size="sm" className="w-full flex-1 rounded-lg h-8" suppressHydrationWarning>
                            Add to Cart
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-lg border-primary-dark/30 text-primary-dark/80 hover:bg-primary-dark/10" asChild suppressHydrationWarning>
                            <a href={`tel:${phoneNumber}`}>
                                <Phone className="h-4 w-4" />
                                <span className="sr-only">Call to Order</span>
                            </a>
                        </Button>
                    </div>
                    <Button onClick={() => setIsQrModalOpen(true)} variant="secondary" size="sm" className="w-full text-xs text-center h-8" suppressHydrationWarning>
                        Order on WhatsApp
                    </Button>
                </div>
            </div>
        </CardContent>
        </Card>
        <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Order: {item.name}</DialogTitle>
                    <DialogDescription>
                    Fill your details, pay via QR, and confirm your order on WhatsApp.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSendToWhatsapp} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-3">
                        <div className="space-y-2">
                        <Label htmlFor={`name-${cardId}`}>Full Name</Label>
                        <Input id={`name-${cardId}`} name="name" placeholder="John Doe" required onChange={handleDetailsChange} value={customerDetails.name} suppressHydrationWarning />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`email-${cardId}`}>Email</Label>
                        <Input id={`email-${cardId}`} name="email" type="email" placeholder="you@example.com" required onChange={handleDetailsChange} value={customerDetails.email} suppressHydrationWarning />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`phone-${cardId}`}>Phone Number</Label>
                        <Input id={`phone-${cardId}`} name="phone" type="tel" placeholder="9876543210" required onChange={handleDetailsChange} value={customerDetails.phone} suppressHydrationWarning />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`address-${cardId}`}>Delivery Address</Label>
                        <Input id={`address-${cardId}`} name="address" placeholder="123 Main St, Rampurhat" required onChange={handleDetailsChange} value={customerDetails.address} suppressHydrationWarning />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`landmark-${cardId}`}>Landmark</Label>
                        <Input id={`landmark-${cardId}`} name="landmark" placeholder="Near City Mall" onChange={handleDetailsChange} value={customerDetails.landmark} suppressHydrationWarning />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`pincode-${cardId}`}>Pincode</Label>
                        <Input id={`pincode-${cardId}`} name="pincode" type="text" placeholder="731235" maxLength={6} required onChange={handleDetailsChange} value={customerDetails.pincode} suppressHydrationWarning />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`date-${cardId}`}>Delivery Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                suppressHydrationWarning>
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
                        <Label htmlFor={`time-${cardId}`}>Delivery Time</Label>
                        <Select value={timeSlot} onValueChange={setTimeSlot}>
                            <SelectTrigger id={`time-${cardId}`} suppressHydrationWarning>
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

                    <Separator />

                    <div className="text-sm text-center text-muted-foreground">
                        1. Scan the QR code to pay Rs. {item.price}.<br/>2. Enter the transaction ID below.
                    </div>

                    <div className="flex items-center justify-center py-2">
                        <Image
                        src={config.payment.qrCodeUrl}
                        alt="Payment QR Code"
                        width={200}
                        height={200}
                        className="rounded-md ring-1 ring-border"
                        priority
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`transactionId-collection-${cardId}`}>Transaction ID</Label>
                        <Input
                        id={`transactionId-collection-${cardId}`}
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Enter 10+ digit transaction ID"
                        required
                        minLength={10}
                        suppressHydrationWarning
                        />
                    </div>
                    <DialogFooter className="sm:justify-start pt-4">
                        <Button type="submit" className="w-full" disabled={!transactionId || transactionId.length < 10} suppressHydrationWarning>
                        Confirm and Place Order via WhatsApp
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            </Dialog>
    </>
  );
};


export default function ProductSection({ id, title, subtitle, items, bgColor = 'bg-background', viewAllLink = "#", showViewAll = true, prioritizeImages = false }: ProductSectionProps) {
  
  // If there's no title, we assume it's being used just to render a grid of cards
  if (!title) {
    return (
      <>
        {items.map((item, index) => (
            <ProductCard key={item.id} item={item} priority={prioritizeImages && index < 2} />
          ))}
      </>
    )
  }
  
  return (
    <section id={id} className={bgColor}>
      <div className="container mx-auto">
        <div className="text-center mb-10">
          {title && <h2 className="text-3xl font-semibold">{title}</h2>}
          {subtitle && <p className="text-muted-foreground mt-1 text-ui">{subtitle}</p>}
          <div className="w-20 h-px bg-soft-divider mx-auto mt-4"></div>
        </div>
        
        {id === 'hot-beverages' ? (
            <div className="md:hidden">
                <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 scrollbar-hide">
                    {items.map((item, index) => (
                        <div key={item.id} className="w-[173px] shrink-0">
                            <ProductCard item={item} priority={prioritizeImages && index < 4} />
                        </div>
                    ))}
                </div>
            </div>
        ) : null}
        
        <div className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6",
            id === 'hot-beverages' && 'hidden md:grid'
        )}>
          {items.map((item, index) => (
            <ProductCard key={item.id} item={item} priority={prioritizeImages && index < 4} />
          ))}
        </div>

        {showViewAll && viewAllLink && (
            <div className="text-center mt-10">
                <Button variant="outline" asChild size="lg" className="border-primary-dark/50 text-primary-dark hover:bg-primary-dark/10" suppressHydrationWarning>
                    <Link href={viewAllLink}>View All</Link>
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}
