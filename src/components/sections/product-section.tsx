
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
import { Separator } from '../ui/separator';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';


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
  
  const handleAddToCart = () => {
    addToCart(item);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <>
      <Card className="overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300 border-0 rounded-lg flex flex-col h-full">
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
              <h4 className="font-medium text-sm text-gray-800 line-clamp-2 h-10">{item.name}</h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description}</p>
              <p className="font-semibold text-gray-900 mt-auto pt-2">{`Rs. ${item.price}`}</p>
            </div>
          </Link>
        </CardContent>
        <div className="p-4 pt-0">
           <Button onClick={handleAddToCart} variant="outline" className="w-full text-xs text-center" size="sm" suppressHydrationWarning>
              Add to Cart
            </Button>
        </div>
      </Card>
    </>
  );
};

export default function ProductSection({ id, title, subtitle, items, bgColor = 'bg-white', viewAllLink = "#", showViewAll = true }: ProductSectionProps) {
  const useCarousel = ['best-selling-cakes', 'quick-bites', 'top-gifts', 'hot-beverages', 'flowers-more'].includes(id || '');

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
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {/* Mobile: Carousel for specific sections, Grid for others */}
        <div className="md:hidden">
          {useCarousel ? (
            <Carousel opts={{ align: "start", slidesToScroll: "auto" }}>
              <CarouselContent className="-ml-2">
                {items.map((item, index) => (
                  <CarouselItem key={index} className="basis-3/4 sm:basis-1/2 pl-2">
                    <ProductCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {items.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
