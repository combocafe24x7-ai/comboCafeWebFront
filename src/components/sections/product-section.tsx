
"use client";
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { useCart } from '@/context/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  badge?: string;
};

type ProductSectionProps = {
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
    <Card className="overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300 border-0 rounded-lg flex flex-col">
      <CardContent className="p-0 flex-grow">
        <Link href="#" className="flex flex-col h-full">
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
            <p className="text-xs text-gray-500 mt-1 h-8 leading-4 flex-grow">{item.description}</p>
            <p className="font-semibold text-gray-900 mt-2">{`Rs. ${item.price}`}</p>
          </div>
        </Link>
      </CardContent>
      <div className="p-4 pt-0">
        <Button onClick={handleAddToCart} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default function ProductSection({ title, subtitle, items, bgColor = 'bg-white', viewAllLink = "#", showViewAll = true }: ProductSectionProps) {
  return (
    <section className={bgColor}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-semibold">{title}</h2>
            {subtitle && <p className="text-md text-gray-500 mt-1">{subtitle}</p>}
          </div>
           {showViewAll && <Button variant="outline" asChild>
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
