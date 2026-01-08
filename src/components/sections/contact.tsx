
"use client";

import React, { useState, useEffect } from 'react';
import { config } from '@/app/config.tsx';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { useAccentColor } from '@/context/accent-color-provider';
import { cn } from '@/lib/utils';

export default function Contact() {
  const { displayColor } = useAccentColor();
  const [shopStatus, setShopStatus] = useState<'loading' | 'open' | 'closed'>('loading');

  useEffect(() => {
    // This logic runs only on the client to avoid hydration mismatch
    const checkOpeningStatus = () => {
      try {
        const now = new Date();
        // Get the current hour in Asia/Kolkata timezone (GMT+5:30)
        const hourString = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          hour12: false,
        });
        const currentHour = parseInt(hourString, 10);

        const openingHour = 10; // 10 AM
        const closingHour = 20; // 8 PM

        if (currentHour >= openingHour && currentHour < closingHour) {
          setShopStatus('open');
        } else {
          setShopStatus('closed');
        }
      } catch (error) {
        console.error("Could not determine time zone, defaulting to closed:", error);
        setShopStatus('closed'); // Default to closed on error
      }
    };

    checkOpeningStatus();
    // Optional: Check every minute
    const interval = setInterval(checkOpeningStatus, 60000);
    return () => clearInterval(interval);
  }, []);


  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground">Get In Touch</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">We'd love to hear from you. Visit us for a coffee or drop us a line.</p>
        </div>

        <Card className="shadow-lg dark:shadow-black/20 border-0 p-4 max-w-4xl mx-auto w-full">
            <CardContent className="p-2 sm:p-6">
                <ul className="space-y-6">
                    <li className="flex items-center justify-between gap-4">
                        <div className='flex items-start gap-4'>
                            <MapPin className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: displayColor }} />
                            <div>
                                <h4 className="font-bold text-lg">Our Location</h4>
                                <p className="text-muted-foreground text-sm">Find us on the map</p>
                            </div>
                        </div>
                        <Button asChild size="lg" className="w-28 sm:w-32 justify-center text-xs sm:text-sm">
                            <a href={config.contact.locationUrl} target="_blank" rel="noopener noreferrer">View Map</a>
                        </Button>
                    </li>
                     <li className="flex items-center justify-between gap-4">
                        <div className='flex items-start gap-4'>
                            <Phone className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: displayColor }} />
                            <div>
                                <h4 className="font-bold text-lg">Phone</h4>
                                <p className="text-muted-foreground text-sm">Give us a call</p>
                            </div>
                        </div>
                        <Button asChild size="lg" className="w-28 sm:w-32 justify-center hover:animate-pulse text-xs sm:text-sm">
                            <a href={`tel:${config.contact.phone}`}>Call Now</a>
                        </Button>
                    </li>
                     <li className="flex items-center justify-between gap-4">
                        <div className='flex items-start gap-4'>
                            <Mail className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: displayColor }} />
                            <div>
                                <h4 className="font-bold text-lg">Email</h4>
                                <p className="text-muted-foreground text-sm">Send us a message</p>
                            </div>
                        </div>
                         <Button asChild size="lg" className="w-28 sm:w-32 justify-center text-xs sm:text-sm">
                            <a href={`mailto:${config.contact.email}`}>Send Email</a>
                        </Button>
                    </li>
                     <li className="flex items-center justify-between gap-4">
                        <div className='flex items-start gap-4'>
                            <Clock className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: displayColor }} />
                            <div>
                                <h4 className="font-bold text-lg">Opening Hours</h4>
                                <p className="text-muted-foreground text-sm">{config.contact.hours}</p>
                            </div>
                        </div>
                        <Button
                            variant={shopStatus === 'open' ? 'secondary' : 'destructive'}
                            size="lg"
                            className={cn(
                                "w-28 sm:w-32 justify-center text-xs sm:text-sm transition-colors",
                                shopStatus === 'open' && 'bg-green-500 hover:bg-green-600 text-white',
                                shopStatus === 'closed' && 'bg-red-500 hover:bg-red-600 text-white'
                            )}
                            disabled
                        >
                            {shopStatus === 'loading' ? '...' : shopStatus.charAt(0).toUpperCase() + shopStatus.slice(1)}
                        </Button>
                    </li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
