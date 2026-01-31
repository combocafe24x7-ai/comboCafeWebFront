"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useCart, Product } from '@/context/cart-provider';
import { Phone, Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export const ProductCard = ({ item, priority }: { item: Product; priority?: boolean }) => {
    const { toast } = useToast();
    const { addToCart } = useCart();
    const phoneNumber = "918436860216";
    const router = useRouter();

    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [orderMethod, setOrderMethod] = useState('whatsapp');
    const [deliveryMethod, setDeliveryMethod] = useState('home-delivery');
    const [paymentMethod, setPaymentMethod] = useState('prepaid');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [upiLink, setUpiLink] = useState('');

    const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [isAddressVerified, setIsAddressVerified] = useState(false);
    const [isVerificationInProgress, setIsVerificationInProgress] = useState(false);
    const [showDeliveryErrorModal, setShowDeliveryErrorModal] = useState(false);
    const permissionRequested = useRef(false);

    const STORE_COORDINATES = { latitude: 24.1818, longitude: 87.7901 };

    function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }
    
    const requestLocation = () => {
        if (deliveryMethod !== 'home-delivery' || userLocation || locationError || permissionRequested.current) {
            return;
        }
        permissionRequested.current = true;
        setIsVerificationInProgress(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLocationError(null);
                setIsVerificationInProgress(false);
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    setLocationError("Location permission denied. Please enable it to check delivery availability.");
                } else {
                    setLocationError("Could not get location. Please check your device settings.");
                }
                setIsVerificationInProgress(false);
            },
            { timeout: 10000 }
        );
    }

    const handleVerifyAddress = () => {
        if (!userLocation) {
            requestLocation();
            toast({
                variant: 'destructive',
                title: 'Location not available',
                description: 'Please allow location access to verify your address.',
            });
            return;
        }

        setIsVerificationInProgress(true);
        const distance = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            STORE_COORDINATES.latitude,
            STORE_COORDINATES.longitude
        );

        if (distance <= 5) {
            setIsAddressVerified(true);
            toast({
                title: 'Address Verified!',
                description: 'Your location is within our delivery area.',
            });
        } else {
            setShowDeliveryErrorModal(true);
        }
        setIsVerificationInProgress(false);
    };

    const handleCancelOrder = () => {
        setIsCancelConfirmOpen(false);
        setTimeout(() => {
            setIsQrModalOpen(false);
        }, 300);
    };

    const finalPrice = useMemo(() => {
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
        setIsAddressVerified(false);
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

    const cardId = item.id || item.name;

    useEffect(() => {
        if (isQrModalOpen) {
            const upiUrl = `upi://pay?pa=soumyasaha18@oksbi&pn=Soumya%20Saha&am=${finalPrice.toFixed(2)}&cu=INR&tn=${encodeURIComponent(item.name)}`;
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
    }, [isQrModalOpen, item.name, finalPrice, toast]);

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
        
        if (deliveryMethod === 'home-delivery' && customerDetails.pincode !== '731224') {
            toast({
                variant: 'destructive',
                title: 'Pincode not serviceable',
                description: 'We currently only deliver to pincode 731224.',
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
- ${item.name} (x1)

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
    
    const handleBuyNow = () => {
        setIsQrModalOpen(true);
    };

    const handlePaymentModalOpenChange = (open: boolean) => {
        if (!open) {
            if (orderMethod === 'call') {
                setIsQrModalOpen(false);
                return;
            }
            setIsCancelConfirmOpen(true);
        }
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
                            unoptimized
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
                        <div>
                            <p className="font-sans font-bold text-base text-primary-dark">{`Rs. ${item.price}`}</p>
                            {parseFloat(item.price) < 299 && (
                                <p className="text-xs text-muted-foreground mt-1">₹25 Delivery</p>
                            )}
                        </div>
                        <div className="mt-2 space-y-2">
                            <Button onClick={handleAddToCart} size="sm" className="w-full text-xs text-center rounded-md h-8" variant="default" suppressHydrationWarning>
                                Add to Cart
                            </Button>
                            <Button onClick={handleBuyNow} variant="secondary" size="sm" className="w-full text-xs text-center rounded-md h-8" suppressHydrationWarning>
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Dialog open={isQrModalOpen} onOpenChange={handlePaymentModalOpenChange}>
                <DialogContent className="w-screen h-screen max-w-full rounded-none border-0 p-0 sm:h-auto sm:w-full sm:max-w-4xl sm:rounded-lg sm:border">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle>Your Order</DialogTitle>
                        <DialogDescription>
                            Confirm your details and place the order.
                        </DialogDescription>
                    </DialogHeader>
                    <form id={`form-${cardId}`} onSubmit={handleSendToWhatsapp}>
                        <div className="px-6 pt-4 space-y-2">
                            <Label>Ordering Method</Label>
                            <RadioGroup
                                value={orderMethod}
                                onValueChange={setOrderMethod}
                                className="flex space-x-4 pt-2"
                                defaultValue="whatsapp"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="whatsapp" id={`whatsapp-order-product-${cardId}`} />
                                    <Label htmlFor={`whatsapp-order-product-${cardId}`} className="font-normal">Order on WhatsApp</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="call" id={`call-order-product-${cardId}`} />
                                    <Label htmlFor={`call-order-product-${cardId}`} className="font-normal">Call to Order</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        {orderMethod === 'whatsapp' ? (
                            <>
                                <div className="grid md:grid-cols-2 md:gap-8 overflow-y-auto px-6 h-[calc(100vh-250px)] sm:h-auto sm:max-h-[55vh] pb-4 pt-4 border-t mt-4">
                                    {/* Left Column: Form fields */}
                                    <div className="space-y-4">
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
                                                    <Input id={`address-${cardId}`} name="address" placeholder="123 Main St, Rampurhat" required={deliveryMethod === 'home-delivery'} onChange={handleDetailsChange} onFocus={requestLocation} onInput={() => setIsAddressVerified(false)} value={customerDetails.address} suppressHydrationWarning />
                                                    <p className="text-xs text-muted-foreground pt-1">📍 We use your location only to check delivery availability within 5 km.</p>
                                                     {locationError && (
                                                        <p className="text-sm text-destructive pt-1">{locationError}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`landmark-${cardId}`}>Landmark</Label>
                                                    <Input id={`landmark-${cardId}`} name="landmark" placeholder="Near City Mall" onChange={handleDetailsChange} onInput={() => setIsAddressVerified(false)} value={customerDetails.landmark} suppressHydrationWarning />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`pincode-${cardId}`}>Pincode</Label>
                                                    <Input id={`pincode-${cardId}`} name="pincode" type="text" value="731224" readOnly required={deliveryMethod === 'home-delivery'} className="bg-gray-100" suppressHydrationWarning />
                                                </div>
                                                {!isAddressVerified && (
                                                    <div className="!mt-4">
                                                        <Button type="button" onClick={handleVerifyAddress} className="w-full" disabled={isVerificationInProgress || !userLocation}>
                                                             {isVerificationInProgress && !userLocation ? 'Getting Location...' : isVerificationInProgress ? 'Verifying...' : 'Submit Address & Verify Availability'}
                                                        </Button>
                                                    </div>
                                                )}
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
                                                {timeSlots.map((slot, index) => (
                                                    <SelectItem key={`${slot}-${index}`} value={slot}>
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
                                                    <RadioGroupItem value="prepaid" id={`prepaid-product-${cardId}`} />
                                                    <Label htmlFor={`prepaid-product-${cardId}`} className="font-normal">Pay Now</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="cod" id={`cod-product-${cardId}`} />
                                                    <Label htmlFor={`cod-product-${cardId}`} className="font-normal">Cash on Delivery</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    
                                    {/* Right Column: Order Summary & Payment */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                                            <Card>
                                                <CardContent className="p-4 space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                            <Image src={item.imageUrl} alt={item.name} width={48} height={48} className="rounded-md" unoptimized />
                                                            <div>
                                                                <p className="font-semibold text-sm">{item.name}</p>
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
                                                    <p className="mt-1 font-semibold">Please double-check the Transaction ID. Orders without a correct ID cannot be processed.</p>
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
        
                                                <div className="space-y-2 text-center pt-4">
                                                    <Input
                                                        id={`transactionId-product-${cardId}`}
                                                        value={transactionId}
                                                        onChange={(e) => setTransactionId(e.target.value)}
                                                        placeholder="Enter Transaction ID"
                                                        aria-label="Transaction ID"
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
                                        <Button type="submit" form={`form-${cardId}`} className="w-full" size="lg" disabled={!transactionId || transactionId.length < 12 || (deliveryMethod === 'home-delivery' && !isAddressVerified)} suppressHydrationWarning>
                                            I have paid - Place Order on WhatsApp
                                        </Button>
                                    ) : (
                                         <Button type="submit" form={`form-${cardId}`} className="w-full" size="lg" disabled={(deliveryMethod === 'home-delivery' && !isAddressVerified)} suppressHydrationWarning>
                                            Place Order on WhatsApp
                                         </Button>
                                    )}
                                </DialogFooter>
                            </>
                        ) : (
                            <div className="p-6 border-t mt-4">
                                <Button asChild className="w-full" size="lg">
                                    <a href="tel:918436860216">
                                        <Phone className="mr-2 h-4 w-4" />
                                        Call to Place Order
                                    </a>
                                </Button>
                            </div>
                        )}
                    </form>
                </DialogContent>
            </Dialog>
             <AlertDialog open={isCancelConfirmOpen} onOpenChange={setIsCancelConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                        <AlertDialogDescription>
                            If you have already paid, please do NOT cancel. Instead, complete the process by sending your order details on WhatsApp.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Go Back</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={handleCancelOrder}>
                            Cancel Order
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={showDeliveryErrorModal} onOpenChange={setShowDeliveryErrorModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>🚫 Oops! Delivery Not Available</AlertDialogTitle>
                        <AlertDialogDescription>
                            Deliveries are available only within a 5 km radius from our store. You appear to be outside this area.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowDeliveryErrorModal(false)}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
