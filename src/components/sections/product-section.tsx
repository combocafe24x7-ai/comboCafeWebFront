"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useCart } from '@/context/cart-provider';
import { Phone, Star } from 'lucide-react';

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
};

const ProductCard = ({ item }: { item: Product }) => {
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

  return (
    <Card className="overflow-hidden group bg-card shadow-card border-0 rounded-card flex flex-col h-full">
      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-card">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {item.badge && (
           <div className="absolute top-0 left-0 bg-primary/90 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-br-lg">
             {item.badge}
           </div>
        )}
      </div>

      <CardContent className="p-4 flex flex-col flex-grow bg-card rounded-b-card">
        <h3 className="font-sans font-semibold text-text text-base leading-tight line-clamp-2 h-12">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-ui text-sm mt-1 line-clamp-1">{item.description}</p>
        
        <div className="flex items-center gap-2 mt-2 text-ui">
            <div className="flex items-center gap-0.5">
                <Star className="w-4 h-4 text-star fill-star" />
                <Star className="w-4 h-4 text-star fill-star" />
                <Star className="w-4 h-4 text-star fill-star" />
                <Star className="w-4 h-4 text-star fill-star" />
                <Star className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">4.9</span>
             <span className="text-xs text-muted-foreground font-medium">| 120+ orders</span>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex justify-between items-center">
            <p className="font-sans font-bold text-lg text-primary-dark">{`Rs. ${item.price}`}</p>
            <div className="flex items-center gap-2">
                <Button onClick={handleAddToCart} variant="secondary" size="sm" className="rounded-lg h-9 px-4" suppressHydrationWarning>
                    Add to Cart
                </Button>
                 <Button asChild variant="outline" size="icon" className="h-9 w-9 rounded-lg border-primary-dark/30 text-primary-dark/80 hover:bg-primary-dark/10">
                    <a href={`tel:${phoneNumber}`}>
                        <Phone className="w-4 h-4" />
                    </a>
                </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export default function ProductSection({ id, title, subtitle, items, bgColor = 'bg-background', viewAllLink = "#", showViewAll = true }: ProductSectionProps) {
  
  // If there's no title, we assume it's being used just to render a grid of cards
  if (!title) {
    return (
      <>
        {items.map((item) => (
            <ProductCard key={item.id} item={item} />
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
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
