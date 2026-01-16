"use client";
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { useCart } from '@/context/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
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
import { Separator } from '@/components/ui/separator';


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
  title: string;
  subtitle?: string;
  items: Product[];
  bgColor?: string;
  viewAllLink?: string;
  showViewAll?: boolean;
};

const ProductCard = ({ item }: { item: Product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const phoneNumber = "918436860216";
  
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

  const handleAddToCart = () => {
    addToCart(item);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
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
      <Card className="overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300 border-0 rounded-lg flex flex-col">
        <CardContent className="p-0 flex-grow">
          <Link href={`/search?q=${encodeURIComponent(item.name)}`} className="flex flex-col h-full">
            <div className="relative aspect-square">
              <Image 
                src={item.imageUrl} 
                alt={item.name} 
                layout="fill" 
                className="object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              {item.badge && (
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">{item.badge}</Badge>
              )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h4 className="font-medium text-sm text-gray-800 truncate">{item.name}</h4>
              <p className="text-xs text-gray-500 mt-1 h-4 truncate">{item.description}</p>
              <p className="font-semibold text-gray-900 mt-auto pt-2">{`Rs. ${item.price}`}</p>
            </div>
          </Link>
        </CardContent>
        <div className="p-4 pt-0 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAddToCart} variant="outline" className="w-full text-xs text-center" size="sm" suppressHydrationWarning>
              Add to Cart
            </Button>
            <Button onClick={() => setIsQrModalOpen(true)} variant="secondary" className="w-full text-xs text-center" size="sm" suppressHydrationWarning>
                Order on WhatsApp
            </Button>
          </div>
          <Button asChild variant="outline" className="w-full text-xs text-center" size="sm" suppressHydrationWarning>
              <a href={`tel:+${phoneNumber}`}>
                  Call to Order
              </a>
          </Button>
        </div>
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
                <Label htmlFor={`name-${item.id}`}>Full Name</Label>
                <Input id={`name-${item.id}`} name="name" placeholder="John Doe" required onChange={handleDetailsChange} value={customerDetails.name} suppressHydrationWarning />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`email-${item.id}`}>Email</Label>
                <Input id={`email-${item.id}`} name="email" type="email" placeholder="you@example.com" required onChange={handleDetailsChange} value={customerDetails.email} suppressHydrationWarning />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`phone-${item.id}`}>Phone Number</Label>
                <Input id={`phone-${item.id}`} name="phone" type="tel" placeholder="9876543210" required onChange={handleDetailsChange} value={customerDetails.phone} suppressHydrationWarning />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`address-${item.id}`}>Delivery Address</Label>
                <Input id={`address-${item.id}`} name="address" placeholder="123 Main St, Rampurhat" required onChange={handleDetailsChange} value={customerDetails.address} suppressHydrationWarning />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`landmark-${item.id}`}>Landmark</Label>
                <Input id={`landmark-${item.id}`} name="landmark" placeholder="Near City Mall" onChange={handleDetailsChange} value={customerDetails.landmark} suppressHydrationWarning />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`pincode-${item.id}`}>Pincode</Label>
                <Input id={`pincode-${item.id}`} name="pincode" type="text" placeholder="731235" maxLength={6} required onChange={handleDetailsChange} value={customerDetails.pincode} suppressHydrationWarning />
              </div>
               <div className="space-y-2">
                  <Label htmlFor={`date-${item.id}`}>Delivery Date</Label>
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
                  <Label htmlFor={`time-${item.id}`}>Delivery Time</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger id={`time-${item.id}`} suppressHydrationWarning>
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
                <Label htmlFor={`transactionId-${item.id}`}>Transaction ID</Label>
                <Input
                  id={`transactionId-${item.id}`}
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

export default function ProductSection({ id, title, subtitle, items, bgColor = 'bg-white', viewAllLink = "#", showViewAll = true }: ProductSectionProps) {
  return (
    <section id={id} className={bgColor}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-semibold">{title}</h2>
            {subtitle && <p className="text-md text-gray-500 mt-1">{subtitle}</p>}
          </div>
           {showViewAll && viewAllLink && <Button variant="outline" asChild>
            <Link href={viewAllLink}>View All</Link>
          </Button>}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
