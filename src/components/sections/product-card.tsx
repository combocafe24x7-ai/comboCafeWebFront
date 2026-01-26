"use client";
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useCart, Product } from '@/context/cart-provider';
import { Phone, Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { config } from '@/app/config';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ProductCard = ({ item, priority }: { item: Product; priority?: boolean }) => {
    const { toast } = useToast();
    const { addToCart } = useCart();
    const phoneNumber = "918436860216";

    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('home-delivery');
    const [paymentMethod, setPaymentMethod] = useState('prepaid');
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    const deliveryTimeSlots = [
        "10:00 AM - 12:00 PM",
        "12:00 PM - 02:00 PM",
        "02:00 PM - 04:00 PM",
        "04:00 PM - 06:00 PM",
        "06:00 PM - 08:00 PM",
    ];

    const takeAwayTimeSlots = [
        "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
        "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
        "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
        "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
        "08:00 PM", "08:30 PM",
    ];

    const [timeSlot, setTimeSlot] = useState(deliveryTimeSlots[0]);

    const timeSlots = useMemo(() => {
        return deliveryMethod === 'home-delivery' ? deliveryTimeSlots : takeAwayTimeSlots;
    }, [deliveryMethod]);
    
    const handleDeliveryMethodChange = (value: string) => {
        setDeliveryMethod(value);
        if (value === 'home-delivery') {
            setTimeSlot(deliveryTimeSlots[0]);
        } else {
            setTimeSlot(takeAwayTimeSlots[0]);
        }
    };
    
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

        const deliveryMethodText = deliveryMethod === 'home-delivery' ? 'Home Delivery' : 'Take Away';

        const deliveryDetails = deliveryMethod === 'home-delivery' ? `
*Delivery Details:*
Address: ${customerDetails.address}${customerDetails.landmark ? `, ${customerDetails.landmark}` : ''}, ${customerDetails.pincode}
` : `
*Pickup Details:*
The customer will pick up from the store.
`;

        const whatsappMessage = `
*New Single Item Order from Combo Cafe Website*

*Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Email: ${customerDetails.email}

*Delivery Method: ${deliveryMethodText}*
${deliveryDetails}

*${deliveryMethod === 'home-delivery' ? 'Delivery' : 'Pickup'} Date:* ${date ? format(date, "PPP") : 'Not specified'}
*${deliveryMethod === 'home-delivery' ? 'Delivery' : 'Pickup'} Time:* ${timeSlot}

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
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={priority}
                        />
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
                            {item.description || ' ' /* Non-breaking space to preserve height */}
                        </p>
                    </div>

                    <div className="mt-auto pt-2">
                        <p className="font-sans font-bold text-base text-primary-dark">{`Rs. ${item.price}`}</p>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-2">
                                <Button onClick={handleAddToCart} size="sm" className="w-full flex-1 text-xs text-center rounded-md h-8" variant="default" suppressHydrationWarning>
                                    Add to Cart
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-md border-primary-dark/30 text-primary-dark/80 hover:bg-primary-dark/10" asChild suppressHydrationWarning>
                                    <a href={`tel:${phoneNumber}`}>
                                        <Phone className="h-4 w-4" />
                                        <span className="sr-only">Call to Order</span>
                                    </a>
                                </Button>
                            </div>
                            <Button onClick={() => setIsQrModalOpen(true)} variant="secondary" size="sm" className="w-full text-xs text-center rounded-md h-8" suppressHydrationWarning>
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
                            <Label>Delivery Method</Label>
                            <RadioGroup
                                value={deliveryMethod}
                                onValueChange={handleDeliveryMethodChange}
                                className="flex space-x-4 pt-2"
                                defaultValue="home-delivery"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="home-delivery" id={`home-delivery-${cardId}`} />
                                    <Label htmlFor={`home-delivery-${cardId}`} className="font-normal">Home Delivery</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="take-away" id={`take-away-${cardId}`} />
                                    <Label htmlFor={`take-away-${cardId}`} className="font-normal">Take Away</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        
                        {deliveryMethod === 'home-delivery' && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor={`address-${cardId}`}>Delivery Address</Label>
                                    <Input id={`address-${cardId}`} name="address" placeholder="123 Main St, Rampurhat" required={deliveryMethod === 'home-delivery'} onChange={handleDetailsChange} value={customerDetails.address} suppressHydrationWarning />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`landmark-${cardId}`}>Landmark</Label>
                                    <Input id={`landmark-${cardId}`} name="landmark" placeholder="Near City Mall" onChange={handleDetailsChange} value={customerDetails.landmark} suppressHydrationWarning />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`pincode-${cardId}`}>Pincode</Label>
                                    <Input id={`pincode-${cardId}`} name="pincode" type="text" placeholder="731235" maxLength={6} required={deliveryMethod === 'home-delivery'} onChange={handleDetailsChange} value={customerDetails.pincode} suppressHydrationWarning />
                                </div>
                            </>
                        )}
                        
                        <div className="space-y-2">
                            <Label htmlFor={`date-${cardId}`}>
                                {deliveryMethod === 'home-delivery' ? 'Delivery Date' : 'Pickup Date'}
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-[#f3f3f3] border-2 border-transparent rounded-md h-10 px-3 text-foreground transition-all duration-500 hover:bg-white hover:border-[#4a9dec] focus-visible:bg-white focus-visible:border-[#4a9dec] focus-visible:shadow-date-focus focus-visible:ring-0 focus-visible:ring-offset-0",
                                            !date && "text-muted-foreground"
                                        )}
                                        suppressHydrationWarning
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
                                        initialFocus
                                        disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`time-slot-${cardId}`}>{deliveryMethod === 'home-delivery' ? 'Delivery Time' : 'Pickup Time'}</Label>
                            <Select value={timeSlot} onValueChange={setTimeSlot}>
                                <SelectTrigger
                                id={`time-slot-${cardId}`}
                                className="w-full justify-start text-left font-normal bg-[#f3f3f3] border-2 border-transparent rounded-md h-10 px-3 text-foreground transition-all duration-500 hover:bg-white hover:border-[#4a9dec] focus-visible:bg-white focus-visible:border-[#4a9dec] focus-visible:shadow-date-focus focus-visible:ring-0 focus-visible:ring-offset-0"
                                suppressHydrationWarning
                                >
                                <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                                <SelectContent>
                                {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                    {slot}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Payment Method</Label>
                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                className="flex space-x-4 pt-2"
                                defaultValue="prepaid"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="prepaid" id={`prepaid-${cardId}`} />
                                    <Label htmlFor={`prepaid-${cardId}`} className="font-normal">Pay Now</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cod" id={`cod-${cardId}`} />
                                    <Label htmlFor={`cod-${cardId}`} className="font-normal">Cash on Delivery</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {paymentMethod === 'prepaid' ? (
                            <>
                                <Separator />

                                <div className="text-sm text-center text-muted-foreground">
                                    1. Scan the QR code to pay Rs. {item.price}.<br />2. Enter the transaction ID below.
                                </div>
                                
                                <div className="text-sm text-center text-green-700 bg-green-50 p-3 my-2 rounded-md border border-green-200">
                                    <p className="font-semibold">Due to high payment issues, we are taking payment before placing the order.</p>
                                    <p className="mt-1">Don't worry, you are dealing with genuine people.</p>
                                    <p className="mt-2 text-xs text-green-600">
                                        <a href="tel:8436860216" className="hover:underline">Contact: 8436860216</a>
                                        <span className="mx-2">|</span>
                                        <a href="https://google.com/maps/place/Combo+Cafe+%26+Gifts+Shop/data=!4m2!3m1!1s0x0:0x20d4a8fe5d070ebc?sa=X&ved=1t:2428&ictx=111" target="_blank" rel="noopener noreferrer" className="hover:underline">Location: Nischintapur, Rampurhat</a>
                                    </p>
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
                            </>
                        ) : (
                             <DialogFooter className="sm:justify-start pt-4">
                                <Button asChild className="w-full" suppressHydrationWarning>
                                    <a href={`tel:${phoneNumber}`}>
                                        <Phone className="mr-2 h-4 w-4" />
                                        Call to Place Order
                                    </a>
                                </Button>
                            </DialogFooter>
                        )}
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
