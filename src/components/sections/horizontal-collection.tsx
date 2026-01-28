
"use client";

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from 'next/link';
import React, { useState, useMemo, useEffect } from 'react';
import QRCode from 'qrcode';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';
import { Phone, Calendar as CalendarIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useCart } from '@/context/cart-provider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

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
    prioritizeImages?: boolean;
};

const CollectionCard = ({ item, priority }: { item: CollectionItem; priority?: boolean }) => {
    const phoneNumber = "918436860216";
    const { toast } = useToast();
    const { addToCart } = useCart();
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('home-delivery');
    const [paymentMethod, setPaymentMethod] = useState('prepaid');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [upiLink, setUpiLink] = useState('');
    const router = useRouter();

    const finalPrice = useMemo(() => {
        if (!item.price) return 0;
        const price = parseFloat(item.price);
        let delivery = 0;
        if (deliveryMethod === 'home-delivery' && price < 299) {
            delivery = 25;
        }
        const handling = 5;
        return price + delivery + handling;
    }, [item.price, deliveryMethod]);
    
    const tomorrow = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);
    const [date, setDate] = useState<Date | undefined>(tomorrow);
    
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
        pincode: '731224',
    });

    useEffect(() => {
        if (isQrModalOpen && finalPrice > 0) {
            const upiUrl = `upi://pay?pa=soumyasaha18@oksbi&pn=Soumya%20Saha&am=${finalPrice.toFixed(2)}&cu=INR&tn=${encodeURIComponent(item.title)}`;
            setUpiLink(upiUrl);
            QRCode.toDataURL(upiUrl, { errorCorrectionLevel: 'M' })
                .then(url => {
                    setQrCodeUrl(url);
                })
                .catch(err => {
                    console.error(err);
                    toast({
                        variant: "destructive",
                        title: "Could not generate QR code",
                        description: "Please try again.",
                    });
                });
        }
    }, [isQrModalOpen, item.title, finalPrice, toast]);

    const handleAddToCart = () => {
        if (!item.id || !item.price) {
            toast({
                variant: "destructive",
                title: "Cannot add to cart",
                description: "This item cannot be added to the cart directly.",
            });
            return;
        }
        addToCart({
            id: item.id,
            name: item.title,
            price: item.price,
            imageUrl: item.imageUrl,
            description: item.description || ''
        });
        toast({
            title: "Added to cart",
            description: `${item.title} has been added to your cart.`,
        });
    };

    const handleBuyNow = () => {
        if (!item.id || !item.price) {
             toast({
                variant: "destructive",
                title: "Cannot buy now",
                description: "This item cannot be purchased directly.",
            });
            return;
        }
        setIsQrModalOpen(true);
    };

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSendToWhatsapp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (deliveryMethod === 'home-delivery' && customerDetails.pincode !== '731224') {
            toast({
                variant: "destructive",
                title: "Pincode not serviceable",
                description: "We currently only deliver to pincode 731224.",
            });
            return;
        }

        let paymentInfo = '';
        if (paymentMethod === 'prepaid') {
            if (!transactionId || transactionId.length < 12) {
                toast({
                    variant: "destructive",
                    title: "Valid Transaction ID is required",
                    description: "Please enter a 12-digit transaction ID.",
                });
                return;
            }
            paymentInfo = `
*Payment Information:*
Payment Method: Pay Now (Prepaid)
Transaction ID: *${transactionId}*
`;
        } else { // cod
            paymentInfo = `
*Payment Information:*
Payment Method: Cash on Delivery
`;
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
- ${item.title} (x1)

*Order Total: Rs. ${finalPrice.toFixed(2)}*

${paymentInfo}
        `.trim().replace(/^\s+/gm, '');

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank');

        setIsQrModalOpen(false);
        setTransactionId('');
        setCustomerDetails({ name: '', email: '', phone: '', address: '', landmark: '', pincode: '731224' });
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
                    <div className="block">
                        <div className="relative aspect-square">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                priority={priority}
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <h4 className="font-semibold text-lg text-white line-clamp-2">{item.title}</h4>
                                {item.description && <p className="text-xs text-gray-200 mt-1 line-clamp-1">{item.description}</p>}
                            </div>
                        </div>
                    </div>
                    {item.price && (
                        <div className="p-3 bg-white">
                            <p className="font-semibold text-gray-900 text-sm">{`Rs. ${item.price}`}</p>
                            {parseFloat(item.price) < 299 && (
                                <p className="text-xs text-muted-foreground mt-1">₹25 Delivery</p>
                            )}
                        </div>
                    )}
                </CardContent>
                <div className="p-3 pt-0 bg-white">
                    {item.price ? (
                        <div className="space-y-2">
                           <Button onClick={handleAddToCart} className="w-full text-xs text-center rounded-md h-8" size="sm" suppressHydrationWarning>
                                Add to Cart
                            </Button>
                            <Button onClick={handleBuyNow} variant="secondary" className="w-full text-xs text-center rounded-md h-8" size="sm" suppressHydrationWarning>
                                Buy Now
                            </Button>
                        </div>
                    ) : (
                        <Button asChild variant="secondary" className="w-full text-xs text-center h-8" size="sm" suppressHydrationWarning>
                            <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`I'd like to inquire about: ${item.title}`)}`} target="_blank" rel="noopener noreferrer">
                                Inquire on WhatsApp
                            </a>
                        </Button>
                    )}
                </div>
            </Card>

            {item.price && (
                <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                    <DialogContent className="w-screen h-screen max-w-full rounded-none border-0 p-0 sm:h-auto sm:w-full sm:max-w-4xl sm:rounded-lg sm:border" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                        <DialogHeader className="p-6 pb-0">
                            <DialogTitle>Your Order</DialogTitle>
                            <DialogDescription>
                                Confirm your details and place the order.
                            </DialogDescription>
                        </DialogHeader>
                        <form id={`form-collection-${cardId}`} onSubmit={handleSendToWhatsapp}>
                           <div className="grid md:grid-cols-2 md:gap-8 overflow-y-auto px-6 h-[calc(100vh-170px)] sm:h-auto sm:max-h-[65vh]">
                               {/* Left Column: Form fields */}
                               <div className="space-y-4 py-4">
                                    <h3 className="text-lg font-semibold">Contact & Delivery Details</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor={`name-${cardId}`}>Full Name</Label>
                                        <Input id={`name-${cardId}`} name="name" placeholder="Priya Sharma" required onChange={handleDetailsChange} value={customerDetails.name} suppressHydrationWarning />
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
                                                <RadioGroupItem value="home-delivery" id={`home-delivery-collection-${cardId}`} />
                                                <Label htmlFor={`home-delivery-collection-${cardId}`} className="font-normal">Home Delivery</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="take-away" id={`take-away-collection-${cardId}`} />
                                                <Label htmlFor={`take-away-collection-${cardId}`} className="font-normal">Take Away</Label>
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
                                                <Input id={`pincode-${cardId}`} name="pincode" type="text" value="731224" readOnly required={deliveryMethod === 'home-delivery'} className="bg-gray-100" suppressHydrationWarning />
                                            </div>
                                        </>
                                    )}
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor={`date-collection-${cardId}`}>
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
                                            <PopoverContent className="w-auto p-0 z-[200]">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    disabled={{ before: tomorrow }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor={`time-slot-collection-${cardId}`}>{deliveryMethod === 'home-delivery' ? 'Delivery Time' : 'Pickup Time'}</Label>
                                        <Select value={timeSlot} onValueChange={setTimeSlot}>
                                            <SelectTrigger
                                            id={`time-slot-collection-${cardId}`}
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
                                                <RadioGroupItem value="prepaid" id={`prepaid-collection-${cardId}`} />
                                                <Label htmlFor={`prepaid-collection-${cardId}`} className="font-normal">Pay Now</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="cod" id={`cod-collection-${cardId}`} />
                                                <Label htmlFor={`cod-collection-${cardId}`} className="font-normal">Cash on Delivery</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                                
                                {/* Right Column: Order Summary & Payment */}
                                <div className="space-y-6 py-4">
                                     <div>
                                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                                        <Card>
                                            <CardContent className="p-4 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <Image src={item.imageUrl} alt={item.title} width={48} height={48} className="rounded-md" unoptimized />
                                                        <div>
                                                            <p className="font-semibold text-sm">{item.title}</p>
                                                            <p className="text-sm text-muted-foreground">Qty: 1</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-semibold text-sm">Rs. {parseFloat(item.price).toFixed(2)}</p>
                                                </div>
                                                <Separator />
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex justify-between">
                                                        <span>Subtotal</span>
                                                        <span>Rs. {parseFloat(item.price).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Delivery</span>
                                                        <span>Rs. {(finalPrice - parseFloat(item.price) - 5).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Handling Fee</span>
                                                        <span>Rs. 5.00</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex justify-between font-bold text-base">
                                                        <span>Total</span>
                                                        <span>Rs. {finalPrice.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {paymentMethod === 'prepaid' && (
                                        <div className="space-y-4 rounded-lg border p-4">
                                            <div className="text-sm text-center text-green-700 bg-green-50 p-3 rounded-md border border-green-200">
                                                <p className="font-semibold">You're dealing with genuine people!</p>
                                                <p className="mt-1 font-semibold">Please double-check the Transaction ID (UTR). Orders without a correct UTR cannot be processed.</p>
                                                <p className="mt-2 text-xs text-green-600">
                                                    <a href="tel:8436860216" className="hover:underline">Contact: 8436860216</a>
                                                    <span className="mx-2">|</span>
                                                    <a href="https://google.com/maps/place/Combo+Cafe+%26+Gifts+Shop/data=!4m2!3m1!1s0x0:0x20d4a8fe5d070ebc?sa=X&ved=1t:2428&ictx=111" target="_blank" rel="noopener noreferrer" className="hover:underline">Location: Nischintapur, Rampurhat</a>
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                {qrCodeUrl ? (
                                                    <Image
                                                        src={qrCodeUrl}
                                                        alt="UPI QR Code for payment"
                                                        width={180}
                                                        height={180}
                                                        className="rounded-md ring-1 ring-border"
                                                        priority
                                                    />
                                                ) : (
                                                    <div className="w-[180px] h-[180px] flex items-center justify-center bg-gray-100 rounded-md">
                                                        <p className="text-sm text-gray-500">Generating QR Code...</p>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {qrCodeUrl && upiLink && (
                                                <Button
                                                    type="button"
                                                    onClick={() => { window.location.href = upiLink; }}
                                                    className="w-full"
                                                    suppressHydrationWarning
                                                >
                                                    Pay using UPI App
                                                </Button>
                                            )}

                                            <div className="space-y-2 text-center">
                                                <Label htmlFor={`transactionId-collection-${cardId}`} className="text-center w-full block">UPI Transaction ID (UTR)</Label>
                                                <Input
                                                    id={`transactionId-collection-${cardId}`}
                                                    value={transactionId}
                                                    onChange={(e) => setTransactionId(e.target.value)}
                                                    placeholder="Enter 12-digit UTR here"
                                                    required={paymentMethod === 'prepaid'}
                                                    minLength={12}
                                                    className="text-lg text-center font-mono tracking-widest bg-gray-50 border-2 border-dashed"
                                                    suppressHydrationWarning
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <DialogFooter className="px-6 pb-6 pt-4 border-t bg-background absolute bottom-0 left-0 right-0 sm:relative">
                                {paymentMethod === 'prepaid' ? (
                                    <Button type="submit" form={`form-collection-${cardId}`} className="w-full" size="lg" disabled={!transactionId || transactionId.length < 12} suppressHydrationWarning>
                                        I have paid - Place Order on WhatsApp
                                    </Button>
                                ) : (
                                    <Button type="submit" form={`form-collection-${cardId}`} className="w-full" size="lg" suppressHydrationWarning>
                                        Place Order on WhatsApp
                                    </Button>
                                )}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default function HorizontalCollection({ title, items, bgColor = 'bg-white', viewAllLink = '#', prioritizeImages = false }: HorizontalCollectionProps) {
    return (
        <section className={bgColor}>
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold">{title}</h2>
                    <Button variant="outline" asChild>
                        <Link href={viewAllLink}>View All</Link>
                    </Button>
                </div>

                {/* Mobile Grid */}
                <div className="grid grid-cols-2 gap-3 md:hidden">
                    {items.map((item, index) => (
                        <div key={item.id || index} className="h-full">
                            <CollectionCard item={item} priority={prioritizeImages && index < 2} />
                        </div>
                    ))}
                </div>

                {/* Desktop Carousel */}
                <Carousel
                    opts={{
                        align: "start",
                        slidesToScroll: "auto",
                    }}
                    className="w-full hidden md:block"
                >
                    <CarouselContent className="-ml-4">
                        {items.map((item, index) => (
                            <CarouselItem key={item.id || index} className="pl-4 basis-4/5 sm:basis-1/2 md:basis-1/4 lg:basis-1/5">
                                <div className="h-full">
                                    <CollectionCard item={item} priority={prioritizeImages && index < 5} />
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
