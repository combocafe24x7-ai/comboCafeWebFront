'use client';

import { useCart, Product } from '@/context/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Plus, Minus, Trash2, Phone, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { config } from '@/app/config';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


type CartItemView = {
  product: Product;
  quantity: number;
}

export default function CheckoutPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [orderMethod, setOrderMethod] = useState('whatsapp');
  const [deliveryMethod, setDeliveryMethod] = useState('home-delivery');
  const [paymentMethod, setPaymentMethod] = useState('prepaid');
  
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

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [isClearCartConfirmOpen, setIsClearCartConfirmOpen] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [customerDetails, setCustomerDetails] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [upiLink, setUpiLink] = useState('');

  // Location state
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

  const handleDeliveryMethodChange = (value: string) => {
    setDeliveryMethod(value);
    setIsAddressVerified(false);
    if (value === 'home-delivery') {
      setTimeSlot(deliveryTimeSlots[0]);
    } else {
      setTimeSlot(takeAwayTimeSlots[0]);
    }
  };

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

  const { subtotal, deliveryCharge, handlingFee, total } = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    
    let calcDeliveryCharge = 0;
    if (deliveryMethod === 'home-delivery') {
        for (const item of cart) {
            if (parseFloat(item.price) < 299) {
                calcDeliveryCharge += 25;
            }
        }
    }

    const handlingFee = cart.length > 0 ? 5 : 0;

    const total = subtotal + calcDeliveryCharge + handlingFee;

    return { subtotal, deliveryCharge: calcDeliveryCharge, handlingFee, total };
  }, [cart, deliveryMethod]);

  useEffect(() => {
    if (isQrModalOpen && total > 0) {
      const upiUrl = `upi://pay?pa=soumyasaha18@oksbi&pn=Soumya%20Saha&am=${total.toFixed(2)}&cu=INR&tn=Website%20Order`;
      setUpiLink(upiUrl);
      QRCode.toDataURL(upiUrl)
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
  }, [isQrModalOpen, total, toast]);

  useEffect(() => {
    const checkoutState = localStorage.getItem('checkoutState');
    if (checkoutState === 'paymentPending' && cart.length > 0) {
      const savedDetails = localStorage.getItem('checkoutCustomerDetails');
      if (savedDetails) {
        setCustomerDetails(JSON.parse(savedDetails));
        setIsQrModalOpen(true);
      }
    }
  }, [cart.length]);

  const handleRemoveAllOfItem = (productId: string) => {
    removeFromCart(productId, true);
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pincode = formData.get('pincode');

    if (deliveryMethod === 'home-delivery' && pincode !== '731224') {
      toast({
        variant: 'destructive',
        title: 'Pincode not serviceable',
        description: 'We currently only deliver to pincode 731224.',
      });
      return;
    }
    
    if (cart.length === 0) {
      toast({
        variant: "destructive",
        title: "Your cart is empty",
        description: "Please add items to your cart before placing an order.",
      });
      return;
    }
    
    const customerData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        landmark: formData.get('landmark'),
        pincode: pincode,
    };
    setCustomerDetails(customerData);
    localStorage.setItem('checkoutCustomerDetails', JSON.stringify(customerData));
    localStorage.setItem('checkoutState', 'paymentPending');
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

  const handleConfirmCancel = () => {
    setIsCancelConfirmOpen(false);
    setTimeout(() => {
        setIsQrModalOpen(false);
        localStorage.removeItem('checkoutState');
        localStorage.removeItem('checkoutCustomerDetails');
    }, 300);
  };

  const handleSendToWhatsapp = () => {
    if (!transactionId || transactionId.length < 10) {
        toast({
            variant: "destructive",
            title: "Valid Transaction ID is required",
            description: "Please enter a transaction ID of at least 10 characters.",
        });
        return;
    }

    const itemsSummary = cartItems.map(item => `${item.product.name} (x${item.quantity})`).join('\n - ');

    const deliveryMethodText = deliveryMethod === 'home-delivery' ? 'Home Delivery' : 'Take Away';

    const deliveryDetails = deliveryMethod === 'home-delivery' ? `
*Delivery Details:*
Address: ${customerDetails.address}${customerDetails.landmark ? `, ${customerDetails.landmark}` : ''}, ${customerDetails.pincode}
` : `
*Pickup Details:*
The customer will pick up from the store.
`;

    const whatsappMessage = `
*New Order from Combo Cafe Website*

*Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Email: ${customerDetails.email}

*Delivery Method: ${deliveryMethodText}*
${deliveryDetails}

*${deliveryMethod === 'home-delivery' ? 'Delivery' : 'Pickup'} Date:* ${date ? format(date, "PPP") : 'Not specified'}
*${deliveryMethod === 'home-delivery' ? 'Delivery' : 'Pickup'} Time:* ${timeSlot}

*Order Items:*
 - ${itemsSummary}

*Order Total: Rs. ${total.toFixed(2)}*

*Payment Information:*
Transaction ID: *${transactionId}*
    `.trim().replace(/^\s+/gm, '');
    
    const phoneNumber = "918436860216";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');
    
    clearCart();
    localStorage.removeItem('checkoutState');
    localStorage.removeItem('checkoutCustomerDetails');
    setIsQrModalOpen(false);
    toast({
        title: "Order details sent!",
        description: "Your order has been sent via WhatsApp. We will confirm shortly.",
    });
    router.push('/');
  };

  const handleCodWhatsappOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form) return;

    if (!form.reportValidity()) {
        return;
    }

    const formData = new FormData(form);
    const customerData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        landmark: formData.get('landmark'),
        pincode: formData.get('pincode'),
    };

    const itemsSummary = cartItems.map(item => `${item.product.name} (x${item.quantity})`).join('\n - ');
    const deliveryMethodText = deliveryMethod === 'home-delivery' ? 'Home Delivery' : 'Take Away';

    const deliveryDetails = deliveryMethod === 'home-delivery' ? `
*Delivery Details:*
Address: ${customerData.address}${customerData.landmark ? `, ${customerData.landmark}` : ''}, ${customerData.pincode}
` : `
*Pickup Details:*
The customer will pick up from the store.
`;

    const whatsappMessage = `
*New COD Order from Combo Cafe Website*

*Customer Details:*
Name: ${customerData.name}
Phone: ${customerData.phone}
Email: ${customerData.email}

*Delivery Method: ${deliveryMethodText}*
${deliveryDetails}

*${deliveryMethod === 'home-delivery' ? 'Delivery' : 'Pickup'} Date:* ${date ? format(date, "PPP") : 'Not specified'}
*${deliveryMethod === 'home-delivery' ? 'Delivery' : 'Pickup'} Time:* ${timeSlot}

*Order Items:*
 - ${itemsSummary}

*Order Total: Rs. ${total.toFixed(2)}*

*Payment Method: Cash on Delivery*
    `.trim().replace(/^\s+/gm, '');

    const phoneNumber = "918436860216";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');
    
    clearCart();
    localStorage.removeItem('checkoutState');
    localStorage.removeItem('checkoutCustomerDetails');
    toast({
        title: "Order details sent!",
        description: "Your COD order has been sent via WhatsApp. We will confirm shortly.",
    });
    router.push('/');
  };


  const handleClearCart = () => {
    clearCart();
    toast({
      title: 'Cart Cleared',
      description: 'All items have been removed from your cart.',
    });
    setIsClearCartConfirmOpen(false);
  }

  return (
    <>
      <main className="bg-gray-50 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
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
                    <div className="flex justify-between items-center">
                        <CardTitle>Shopping Cart ({cart.length} items)</CardTitle>
                        {cartItems.length > 0 && (
                            <Button variant="outline" size="sm" onClick={() => setIsClearCartConfirmOpen(true)} suppressHydrationWarning>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Empty Cart
                            </Button>
                        )}
                    </div>
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
                            unoptimized
                          />
                          <div className="flex-grow">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-500">{`Rs. ${product.price}`}</p>
                             <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 px-0" onClick={() => handleRemoveAllOfItem(product.id)} suppressHydrationWarning>
                                <Trash2 className="mr-1 h-4 w-4" />
                                Remove
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => removeFromCart(product.id)} suppressHydrationWarning>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addToCart(product)} suppressHydrationWarning>
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
                    <span>{`Rs. ${subtotal.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery</span>
                    <span>{deliveryCharge > 0 ? `Rs. ${deliveryCharge.toFixed(2)}` : 'Free'}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Handling Fee</span>
                    <span>{`Rs. ${handlingFee.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{`Rs. ${total.toFixed(2)}`}</span>
                  </div>
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleFormSubmit} className="w-full space-y-4">
                        <div className="space-y-2">
                          <Label>Ordering Method</Label>
                          <RadioGroup
                              value={orderMethod}
                              onValueChange={setOrderMethod}
                              className="flex space-x-4 pt-2"
                              defaultValue="whatsapp"
                          >
                              <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="whatsapp" id="whatsapp-order" />
                                  <Label htmlFor="whatsapp-order" className="font-normal">Order on WhatsApp</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="call" id="call-order" />
                                  <Label htmlFor="call-order" className="font-normal">Call to Order</Label>
                              </div>
                          </RadioGroup>
                        </div>
                        
                        <Separator />

                        {orderMethod === 'whatsapp' ? (
                          <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" placeholder="Priya Sharma" required suppressHydrationWarning />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="you@example.com" required suppressHydrationWarning />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" name="phone" type="tel" placeholder="9876543210" required suppressHydrationWarning />
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
                                        <RadioGroupItem value="home-delivery" id="home-delivery" />
                                        <Label htmlFor="home-delivery" className="font-normal">Home Delivery</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="take-away" id="take-away" />
                                        <Label htmlFor="take-away" className="font-normal">Take Away</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            
                            {deliveryMethod === 'home-delivery' && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Delivery Address</Label>
                                        <Input id="address" name="address" placeholder="123 Main St, Rampurhat" required={deliveryMethod === 'home-delivery'} suppressHydrationWarning onFocus={requestLocation} onInput={() => setIsAddressVerified(false)} />
                                        <p className="text-xs text-muted-foreground pt-1">📍 We use your location only to check delivery availability within 5 km.</p>
                                        {locationError && (
                                            <p className="text-sm text-destructive pt-1">{locationError}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="landmark">Landmark</Label>
                                        <Input id="landmark" name="landmark" placeholder="Near City Mall" suppressHydrationWarning onInput={() => setIsAddressVerified(false)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pincode">Pincode</Label>
                                        <Input id="pincode" name="pincode" type="text" value="731224" readOnly required={deliveryMethod === 'home-delivery'} className="bg-gray-100" suppressHydrationWarning />
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
                              <Label htmlFor="date">
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
                              <Label htmlFor="time-slot">{deliveryMethod === 'home-delivery' ? 'Delivery Time' : 'Pickup Time'}</Label>
                              <Select value={timeSlot} onValueChange={setTimeSlot}>
                                <SelectTrigger
                                  id="time-slot"
                                  className="w-full justify-start text-left font-normal bg-[#f3f3f3] border-2 border-transparent rounded-md h-10 px-3 text-foreground transition-all duration-500 hover:bg-white hover:border-[#4a9dec] focus-visible:bg-white focus-visible:border-[#4a9dec] focus-visible:shadow-date-focus focus-visible:ring-0 focus-visible:ring-offset-0"
                                  suppressHydrationWarning
                                >
                                  <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.map((slot, index) => (
                                    <SelectItem key={slot + index} value={slot}>
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
                                        <RadioGroupItem value="prepaid" id="prepaid-checkout" />
                                        <Label htmlFor="prepaid-checkout" className="font-normal">Pay Now</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cod" id="cod-checkout" />
                                        <Label htmlFor="cod-checkout" className="font-normal">Cash on Delivery</Label>
                                    </div>
                                </RadioGroup>
                            </div>


                            {paymentMethod === 'prepaid' ? (
                                <Button type="submit" className="w-full" size="lg" disabled={cart.length === 0 || (deliveryMethod === 'home-delivery' && !isAddressVerified)} suppressHydrationWarning>
                                    Place Order
                                </Button>
                            ) : (
                                <Button type="button" onClick={handleCodWhatsappOrder} className="w-full" size="lg" disabled={cart.length === 0 || (deliveryMethod === 'home-delivery' && !isAddressVerified)} suppressHydrationWarning>
                                    Place COD Order via WhatsApp
                                </Button>
                            )}
                          </div>
                        ) : (
                          <div className="pt-4 border-t">
                            <Button asChild className="w-full" size="lg">
                                <a href="tel:918436860216">
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call to Place Order
                                </a>
                            </Button>
                          </div>
                        )}
                    </form>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div className="mt-12 border-t pt-8">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6 text-center">
                <p className="text-lg text-muted-foreground">Visit our shop and get more unique Gifts and Chocolates...</p>
                <p className="font-semibold mt-2 text-xl">Combo Cafe & Gifts Shop</p>
                <a 
                  href="https://google.com/maps/place/Combo+Cafe+%26+Gifts+Shop/data=!4m2!3m1!1s0x0:0x20d4a8fe5d070ebc?sa=X&ved=1t:2428&ictx=111" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    <span>Nischintapur, Rampurhat, West Bengal 731224</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
       <Dialog open={isQrModalOpen} onOpenChange={handlePaymentModalOpenChange}>
        <DialogContent className="p-0 sm:max-w-md flex flex-col max-h-[95vh] h-full sm:h-auto">
          <DialogHeader className="p-6 pb-4 border-b shrink-0">
            <DialogTitle>Scan to Pay</DialogTitle>
            <DialogDescription>
              1. Scan the QR code to pay Rs. {total.toFixed(2)}.
              <br />
              2. Enter the transaction ID below.
              <br />
              3. Click confirm to place your order via WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-grow p-6">
              <div className="text-sm text-center text-green-700 bg-green-50 p-3 rounded-md border border-green-200">
                <p className="font-semibold text-base">You're dealing with genuine people!</p>
                <p className="mt-2 font-semibold">Please double-check the Transaction ID (UTR). Orders without a correct UTR cannot be processed.</p>
                <p className="mt-2 text-xs text-green-600">
                    <a href="tel:8436860216" className="hover:underline">Contact: 8436860216</a>
                    <span className="mx-2">|</span>
                    <a href="https://google.com/maps/place/Combo+Cafe+%26+Gifts+Shop/data=!4m2!3m1!1s0x0:0x20d4a8fe5d070ebc?sa=X&ved=1t:2428&ictx=111" target="_blank" rel="noopener noreferrer" className="hover:underline">Location: Nischintapur, Rampurhat</a>
                </p>
              </div>
              <div className="flex items-center justify-center py-4">
                {qrCodeUrl ? (
                  <Image
                    src={qrCodeUrl}
                    alt="UPI QR Code for payment"
                    width={250}
                    height={250}
                    className="rounded-md ring-1 ring-border"
                    priority
                  />
                ) : (
                  <div className="w-[250px] h-[250px] flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-sm text-gray-500">Generating QR Code...</p>
                  </div>
                )}
              </div>
              
              {qrCodeUrl && upiLink && (
                <div className="py-2">
                  <Button
                    onClick={() => { window.location.href = upiLink; }}
                    className="w-full"
                    suppressHydrationWarning
                  >
                    Pay using UPI App
                  </Button>
                </div>
              )}

              <div className="space-y-2 text-center pt-4">
                <Label htmlFor="transactionId" className="text-center w-full block">Enter Transaction ID</Label>
                <Input
                  id="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter 12-digit UTR here"
                  aria-label="Transaction ID"
                  required
                  minLength={12}
                  className="text-lg text-center font-mono tracking-widest bg-gray-50 border-2 border-dashed"
                  suppressHydrationWarning
                  autoComplete="off"
                />
              </div>
            </div>
            <DialogFooter className="p-6 pt-4 border-t mt-auto shrink-0 sm:justify-start">
              <Button onClick={handleSendToWhatsapp} className="w-full" disabled={!transactionId || transactionId.length < 12} suppressHydrationWarning>
                I have paid - Place Order on WhatsApp
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isCancelConfirmOpen} onOpenChange={setIsCancelConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
            <AlertDialogDescription>
              If you have already paid, please do NOT cancel. Instead, complete the process by sending your order on WhatsApp.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmCancel}
            >
              Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isClearCartConfirmOpen} onOpenChange={setIsClearCartConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to empty your cart?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will remove all items from your cart and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleClearCart}
            >
              Empty Cart
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
}
