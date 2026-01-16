
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
import { format, addDays, startOfDay } from "date-fns";
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
import { Calendar as CalendarIcon } from 'lucide-react';
import { Separator } from '../ui/separator';

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
- ${item.title}

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

    const cardId = item.id || item.title;

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
                        <h4 className="font-semibold text-lg text-white line-clamp-2">{item.title}</h4>
                        {item.description && <p className="text-xs text-gray-200 mt-1 line-clamp-1">{item.description}</p>}
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
                <Button asChild variant="outline" className="w-full text-xs text-center hidden md:block" size="sm" suppressHydrationWarning>
                    <a href={`tel:+${phoneNumber}`}>
                        Call to Order
                    </a>
                </Button>
          </div>
        </Card>

        {item.price && (
            <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Order: {item.title}</DialogTitle>
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
                            src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/qr/qr%20code.jpeg"
                            alt="Payment QR Code"
                            width={200}
                            height={200}
                            className="rounded-md ring-1 ring-border"
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
                    <CarouselItem key={index} className="pl-4 basis-4/5 sm:basis-1/2 md:basis-1/4 lg:basis-1/5">
                        <div className="h-full">
                            <CollectionCard item={item} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10" />
            </div>
        </Carousel>
      </div>
    </section>
  );
}
