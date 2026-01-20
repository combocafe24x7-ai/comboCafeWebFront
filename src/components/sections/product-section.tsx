
"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useCart } from '@/context/cart-provider';
import { Heart, Phone, Search, Star, ZoomIn } from 'lucide-react';

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

  return (
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
           <div className="mt-2 flex items-center gap-2">
                <Button onClick={handleAddToCart} variant="secondary" size="lg" className="w-full flex-1 rounded-lg h-11" suppressHydrationWarning>
                    Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 rounded-lg border-primary-dark/30 text-primary-dark/80 hover:bg-primary-dark/10" asChild suppressHydrationWarning>
                   <a href={`tel:${phoneNumber}`}>
                    <Phone className="h-5 w-5" />
                    <span className="sr-only">Call to Order</span>
                   </a>
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
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
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
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
