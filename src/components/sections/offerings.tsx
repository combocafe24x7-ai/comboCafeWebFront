
"use client"

import { useState } from 'react';
import { config } from '@/app/config.tsx';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Phone, MessageCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

type Product = {
  name: string;
  price: string;
  imageUrl: string;
  imageHint: string;
  description?: string;
};

type OfferingCategory = 'cakes' | 'flowers' | 'food';
type SubCategory = string;
type SubSubCategory = string;

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
    <Card className="overflow-hidden group border-0 shadow-lg dark_shadow-black/20 hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-none">
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

const CategoryCard = ({ title, imageUrl, imageHint, onClick }: { title: string; imageUrl: string; imageHint: string, onClick: () => void }) => (
  <div className="relative aspect-square overflow-hidden group cursor-pointer" onClick={onClick}>
    <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={imageHint} />
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
      <h3 className="font-headline text-4xl text-white font-bold text-center">{title}</h3>
    </div>
  </div>
);

export default function Offerings() {
  const [selectedCategory, setSelectedCategory] = useState<OfferingCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<SubSubCategory | null>(null);

  const renderContent = () => {
    
    // Level 4: Show products for beverage sub-sub-category
    if (selectedCategory === 'food' && selectedSubCategory === 'Beverages' && selectedSubSubCategory) {
        const items = config.offerings.food.Beverages[selectedSubSubCategory as keyof typeof config.offerings.food.Beverages].items;
        return (
            <div>
                <Button variant="ghost" onClick={() => setSelectedSubSubCategory(null)} className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Beverages
                </Button>
                <div className="grid md:grid-cols-2 lg:grid-cols-4">
                    {items.map(item => <ProductCard key={item.name} item={item} />)}
                </div>
            </div>
        )
    }

    // Level 3: Show products in the selected sub-category or beverage sub-sub-categories
    if (selectedCategory && selectedSubCategory) {
      let items: Product[] = [];
      let note: string | undefined;

      if (selectedCategory === 'cakes') {
        const subCatData = config.offerings.cakes[selectedSubCategory as keyof typeof config.offerings.cakes];
        items = subCatData.items;
        note = subCatData.note;
        return (
            <div>
               <Button variant="ghost" onClick={() => setSelectedSubCategory(null)} className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to {selectedCategory}
              </Button>
              <div className='text-center my-4'>
                  {note && <Badge variant="secondary">{note}</Badge>}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4">
                {items.map(item => <ProductCard key={item.name} item={item} />)}
              </div>
            </div>
          )
      } else if (selectedCategory === 'food' && selectedSubCategory === 'Snacks') {
          items = config.offerings.food[selectedSubCategory as keyof typeof config.offerings.food].items;
          return (
            <div>
               <Button variant="ghost" onClick={() => setSelectedSubCategory(null)} className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to {selectedCategory}
              </Button>
              <div className="grid md:grid-cols-2 lg:grid-cols-4">
                {items.map(item => <ProductCard key={item.name} item={item} />)}
              </div>
            </div>
          )
      } else if (selectedCategory === 'food' && selectedSubCategory === 'Beverages') {
          const beverageCategories = Object.keys(config.offerings.food.Beverages);
          return (
            <div>
                <Button variant="ghost" onClick={() => setSelectedSubCategory(null)} className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Food
                </Button>
                <div className="grid md:grid-cols-2">
                    {beverageCategories.map(beverageCat => {
                        const firstItem = config.offerings.food.Beverages[beverageCat as keyof typeof config.offerings.food.Beverages].items[0];
                        return <CategoryCard 
                                    key={beverageCat}
                                    title={beverageCat}
                                    imageUrl={firstItem.imageUrl}
                                    imageHint={firstItem.imageHint}
                                    onClick={() => setSelectedSubSubCategory(beverageCat)}
                                />
                    })}
                </div>
            </div>
          )
      }
    }

    // Level 2: Show sub-categories for the selected main category
    if (selectedCategory) {
      const handleBackClick = () => {
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setSelectedSubSubCategory(null);
      };
      let subCategories, gridCols;

      switch(selectedCategory) {
        case 'cakes':
          subCategories = Object.keys(config.offerings.cakes);
          gridCols = 'md:grid-cols-2';
          return (
            <div>
              <Button variant="ghost" onClick={handleBackClick} className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Offerings
              </Button>
              <div className={`grid ${gridCols}`}>
                  {subCategories.map(subCategory => {
                      const firstItem = config.offerings.cakes[subCategory as keyof typeof config.offerings.cakes].items[0];
                      return <CategoryCard 
                                key={subCategory}
                                title={subCategory}
                                imageUrl={firstItem.imageUrl}
                                imageHint={firstItem.imageHint}
                                onClick={() => setSelectedSubCategory(subCategory)}
                             />
                  })}
              </div>
            </div>
          );
        case 'flowers':
           return (
            <div>
                <Button variant="ghost" onClick={handleBackClick} className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Offerings
                </Button>
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                    {config.offerings.flowers.map(flower => (
                        <FlowerCard key={flower.name} item={flower} />
                    ))}
                </div>
            </div>
           );
        case 'food':
          subCategories = Object.keys(config.offerings.food);
          gridCols = 'md:grid-cols-2';
           return (
            <div>
              <Button variant="ghost" onClick={handleBackClick} className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Offerings
              </Button>
              <div className={`grid ${gridCols}`}>
                  {subCategories.map(subCategory => {
                      const firstItem = (config.offerings.food[subCategory as keyof typeof config.offerings.food] as any).items
                        ? (config.offerings.food[subCategory as keyof typeof config.offerings.food] as any).items[0]
                        : (config.offerings.food[subCategory as keyof typeof config.offerings.food] as any)["Hot Beverages"].items[0];

                      return <CategoryCard 
                                key={subCategory}
                                title={subCategory}
                                imageUrl={firstItem.imageUrl}
                                imageHint={firstItem.imageHint}
                                onClick={() => setSelectedSubCategory(subCategory)}
                             />
                  })}
              </div>
            </div>
          );
        default:
          return null;
      }
    }

    // Level 1: Show main category cards
    const { cakes, flowers, food } = config.offerings;
    return (
      <div className="grid md:grid-cols-3">
        <CategoryCard 
            title="Cakes" 
            imageUrl={cakes["Cakes & Desserts"].items[0].imageUrl}
            imageHint={cakes["Cakes & Desserts"].items[0].imageHint}
            onClick={() => setSelectedCategory('cakes')}
        />
        <CategoryCard 
            title="Flowers"
            imageUrl={flowers[0].imageUrl}
            imageHint={flowers[0].imageHint}
            onClick={() => setSelectedCategory('flowers')}
        />
        <CategoryCard 
            title="Food"
            imageUrl={food.Beverages["Hot Beverages"].items[0].imageUrl}
            imageHint={food.Beverages["Hot Beverages"].items[0].imageHint}
            onClick={() => setSelectedCategory('food')}
        />
      </div>
    );
  };


  return (
    <section id="offerings" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-headline text-foreground">Our Offerings</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">From celebration cakes to hand-tied bouquets, every creation is a piece of art.</p>
        </div>
        
        {renderContent()}

      </div>
    </section>
  );
}

    