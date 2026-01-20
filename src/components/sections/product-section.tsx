
"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useCart } from '@/context/cart-provider';
import { Heart, Star, ZoomIn } from 'lucide-react';

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
        <div className="relative aspect-square w-full overflow-hidden rounded-t-card">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
          />
           <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button onClick={handleWishlistClick} variant="outline" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white border-0 rounded-full shadow-md" suppressHydrationWarning>
                <Heart className="w-4 h-4 text-gray-700" />
              </Button>
              <Button onClick={handleQuickViewClick} variant="outline" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white border-0 rounded-full shadow-md" suppressHydrationWarning>
                <ZoomIn className="w-4 h-4 text-gray-700" />
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
        <h3 className="font-sans font-semibold text-text text-sm md:text-base leading-tight line-clamp-2 h-10 md:h-12">
          {item.name}
        </h3>
        
        <div className="flex items-center gap-2 mt-1 text-ui">
            <div className="flex items-center gap-0.5">
                <Star className="w-4 h-4 text-star fill-star" />
                <Star className="w-4 h-4 text-star fill-star" />
                <Star className="w-4 h-4 text-star fill-star" />
                <Star className="w-4 h-4 text-star fill-star" />
                <Star className="w-4 h-4 text-gray-300" />
            </div>
        </div>

        <div className="mt-auto pt-2">
          <div className="flex justify-between items-center">
            <p className="font-sans font-bold text-base md:text-lg text-primary-dark">{`Rs. ${item.price}`}</p>
          </div>
           <div className="mt-2 space-y-2">
                <Button onClick={handleAddToCart} variant="secondary" size="sm" className="w-full rounded-lg h-9 px-4" suppressHydrationWarning>
                    Add to Cart
                </Button>
                <Button onClick={handleWishlistClick} variant="outline" size="sm" className="w-full rounded-lg h-9 px-4 border-primary-dark/30 text-primary-dark/80 hover:bg-primary-dark/10" suppressHydrationWarning>
                    <Heart className="mr-2 h-4 w-4" /> Wishlist
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
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
