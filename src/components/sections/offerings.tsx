"use client"

import { config } from '@/app/config.tsx';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '../ui/button';
import { Phone, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

type Product = {
  name: string;
  price: string;
  imageUrl: string;
  imageHint: string;
  description?: string;
};

const ProductCard = ({ item }: { item: Product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const whatsAppUrl = `https://wa.me/${config.contact.phone}?text=I'd like to order: ${item.name}`;

  const handleAddToCart = () => {
    addToCart(item);
    toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
    });
  }

  return (
    <Card className="overflow-hidden group border-0 shadow-lg dark:shadow-black/20 hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-none">
      <CardHeader className="p-0">
        <div className="aspect-square relative">
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={item.imageHint} />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl text-foreground">{item.name}</CardTitle>
        {item.description && <p className="text-muted-foreground mt-2 font-body">{item.description}</p>}
        <p className="text-primary font-bold text-xl mt-4">{item.price}</p>
      </CardContent>
      <CardFooter className="p-4 bg-card/50 grid grid-cols-1 sm:grid-cols-3 gap-2">
         <Button onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Cart
        </Button>
         <Button asChild variant="outline">
            <a href={`tel:${config.contact.phone}`}>
                <Phone className="mr-2 h-4 w-4" /> Call
            </a>
        </Button>
        <Button asChild variant="secondary">
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

const FlowerCard = ({ item }: { item: { name: string; description: string; imageUrl: string; imageHint: string; price: string; } }) => (
    <Card className="overflow-hidden group border-0 shadow-lg dark:shadow-black/20 hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-none">
    <CardHeader className="p-0">
      <div className="aspect-square relative">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={item.imageHint} />
      </div>
    </CardHeader>
    <CardContent className="p-6 bg-card flex-grow">
      <CardTitle className="font-headline text-2xl text-foreground">{item.name}</CardTitle>
      <p className="text-muted-foreground mt-2 font-body">{item.description}</p>
       <p className="text-primary font-bold text-xl mt-4">{item.price}</p>
    </CardContent>
     <CardFooter className="p-4 bg-card/50 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button asChild>
            <a href={`tel:${config.contact.phone}`}>
                <Phone className="mr-2 h-4 w-4" /> Call to Order
            </a>
        </Button>
        <Button asChild variant="secondary">
            <a href={`https://wa.me/${config.contact.phone}?text=I'd like to order: ${item.name}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </a>
        </Button>
      </CardFooter>
  </Card>
);

export default function Offerings() {
  return (
    <section id="offerings" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-headline text-foreground">Our Offerings</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">From celebration cakes to hand-tied bouquets, every creation is a piece of art.</p>
        </div>
        
        <Tabs defaultValue="cakes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="cakes">Cakes</TabsTrigger>
            <TabsTrigger value="flowers">Flowers</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
          </TabsList>

          <TabsContent value="cakes">
            <Tabs defaultValue="celebration" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="celebration">Celebration Cakes</TabsTrigger>
                <TabsTrigger value="desserts">Cakes & Desserts</TabsTrigger>
              </TabsList>
              <TabsContent value="celebration">
                <div className='text-center my-4'>
                    <Badge variant="secondary">{config.offerings.cakes["Celebration Cakes"].note}</Badge>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                  {config.offerings.cakes["Celebration Cakes"].items.map(cake => (
                    <ProductCard key={cake.name} item={cake} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="desserts">
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                  {config.offerings.cakes["Cakes & Desserts"].items.map(cake => (
                    <ProductCard key={cake.name} item={cake} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="flowers">
             <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {config.offerings.flowers.map(flower => (
                <FlowerCard key={flower.name} item={flower} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="food">
             <Tabs defaultValue="beverages" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="beverages">Beverages</TabsTrigger>
                <TabsTrigger value="snacks">Snacks</TabsTrigger>
              </TabsList>
              <TabsContent value="beverages">
                <div className="grid md:grid-cols-2 lg:grid-cols-4">
                  {config.offerings.food["Beverages"].items.map(item => (
                    <ProductCard key={item.name} item={item} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="snacks">
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                  {config.offerings.food["Snacks"].items.map(item => (
                    <ProductCard key={item.name} item={item} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
