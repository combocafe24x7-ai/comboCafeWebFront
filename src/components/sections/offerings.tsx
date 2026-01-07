"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import { config } from '@/app/config.tsx';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Phone, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";


type Product = {
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  imageHint: string;
  description?: string;
};

export type OfferingCategory = 'cakes' | 'flowers' | 'food';
export type SubCategory = string;
export type SubSubCategory = string;

type OfferingsProps = {
    initialCategoryState: { category: OfferingCategory, subCategory?: SubCategory, subSubCategory?: SubSubCategory } | null;
    exploreClicked: boolean;
    onResetExplore: () => void;
};

const ProductCard = ({ item }: { item: Product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(item);
    toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
    });
  }

  const getDiscount = () => {
    if (!item.originalPrice || !item.price) return null;
    const original = parseFloat(item.originalPrice.replace(/Rs\s?/i, ''));
    const current = parseFloat(item.price.replace(/Rs\s?/i, ''));
    
    if (isNaN(original) || isNaN(current) || original <= current) return null;
    
    const percentage = Math.round(((original - current) / original) * 100);
    const saved = original - current;
    return { percentage, saved };
  }

  const discount = getDiscount();

  return (
    <Card className="overflow-hidden group border-0 shadow-lg dark:shadow-black/20 hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-none relative">
      {discount && (
        <Badge 
          variant="destructive" 
          className="absolute top-4 right-4 z-10 text-base"
        >
          {discount.percentage}% OFF
        </Badge>
      )}
      <CardHeader className="p-0">
        <div className="aspect-square relative">
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={item.imageHint} />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl text-foreground">{item.name}</CardTitle>
        {item.description && <p className="text-muted-foreground mt-2 font-body">{item.description}</p>}
        <div className="flex items-baseline gap-2 mt-4">
            <p className="text-primary font-bold text-xl">{item.price}</p>
            {item.originalPrice && <p className="text-muted-foreground line-through text-sm">{item.originalPrice}</p>}
        </div>
        {discount && <p className="text-sm text-green-600 font-semibold">You save Rs {discount.saved.toFixed(0)}!</p>}
      </CardContent>
      <CardFooter className="p-4 bg-card/50 grid grid-cols-1 sm:grid-cols-2 gap-2">
         <Button onClick={handleAddToCart}>
            <ShoppingCart /><span>Cart</span>
        </Button>
         <Button asChild variant="outline" className="hover:animate-pulse">
            <a href={`tel:${config.contact.phone}`}>
                <Phone /><span>Call</span>
            </a>
        </Button>
        <Button asChild variant="secondary" className="sm:col-span-2 bg-blue-400 text-white hover:bg-blue-500 hover:animate-pulse">
            <a href={`https://wa.me/${config.contact.phone}?text=I'd like to order: ${item.name} (${item.price})`} target="_blank" rel="noopener noreferrer">
                <span>Order on WhatsApp</span>
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
        <Button asChild className="hover:animate-pulse">
            <a href={`tel:${config.contact.phone}`}>
                <Phone /><span>Call to Order</span>
            </a>
        </Button>
        <Button asChild variant="secondary" className="bg-blue-400 text-white hover:bg-blue-500 hover:animate-pulse">
            <a href={`https://wa.me/${config.contact.phone}?text=I'd like to order: ${item.name}`} target="_blank" rel="noopener noreferrer">
                <span>Order on WhatsApp</span>
            </a>
        </Button>
      </CardFooter>
  </Card>
);

const CategoryCard = ({ title, imageUrl, imageHint, onClick }: { title: string; imageUrl: string; imageHint: string, onClick: () => void }) => (
    <div className="relative aspect-square overflow-hidden group cursor-pointer" onClick={onClick}>
        <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={imageHint} />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
            <h3 className="font-headline text-4xl text-white font-bold text-center">{title}</h3>
            <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 group-hover:bottom-20 transition-all duration-300">
                <Button variant="outline" className="bg-white/20 border-white/50 text-white backdrop-blur-sm hover:bg-white/30">Explore</Button>
            </div>
        </div>
    </div>
);

const DesktopGrid = ({ children }: { children: React.ReactNode }) => (
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4">
        {children}
    </div>
);

const MobileCarousel = ({ children, basis }: { children: React.ReactNode, basis?: string }) => (
    <Carousel 
        opts={{ align: "start" }} 
        className="w-full md:hidden"
    >
        <CarouselContent className="-ml-4">
            {React.Children.map(children, (child) => (
                <CarouselItem className={cn("pl-4", basis || 'basis-4/5')}>{child}</CarouselItem>
            ))}
        </CarouselContent>
    </Carousel>
);


export default function Offerings({ initialCategoryState, exploreClicked, onResetExplore }: OfferingsProps) {
  const [selectedCategory, setSelectedCategory] = useState<OfferingCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<SubSubCategory | null>(null);

  useEffect(() => {
    if (exploreClicked || initialCategoryState) {
        const category = initialCategoryState?.category || selectedCategory;
        if(category) {
            setSelectedCategory(category);
            setSelectedSubCategory(initialCategoryState?.subCategory || null);
            setSelectedSubSubCategory(initialCategoryState?.subSubCategory || null);
        }
        onResetExplore();
    }
  }, [exploreClicked, initialCategoryState, onResetExplore, selectedCategory]);


  const getAnimationKey = () => {
    if (selectedSubSubCategory) return `subsub-${selectedSubSubCategory}`;
    if (selectedSubCategory) return `sub-${selectedSubCategory}`;
    if (selectedCategory) return `cat-${selectedCategory}`;
    return 'main';
  }

  const renderContent = () => {
    
    // Level 4: Show products for beverage sub-sub-category
    if (selectedCategory === 'food' && selectedSubCategory === 'Beverages' && selectedSubSubCategory) {
        const items = config.offerings.food.Beverages[selectedSubSubCategory as keyof typeof config.offerings.food.Beverages].items;
        const productCards = items.map(item => <ProductCard key={item.name} item={item} />);
        return (
            <div>
                <Button variant="ghost" onClick={() => setSelectedSubSubCategory(null)} className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Beverages
                </Button>
                <DesktopGrid>{productCards}</DesktopGrid>
                <MobileCarousel>{productCards}</MobileCarousel>
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
        const productCards = items.map(item => <ProductCard key={item.name} item={item} />);
        return (
            <div>
               <Button variant="ghost" onClick={() => setSelectedSubCategory(null)} className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to {selectedCategory}
              </Button>
              <div className='text-center my-4'>
                  {note && <Badge variant="secondary">{note}</Badge>}
              </div>
                <DesktopGrid>{productCards}</DesktopGrid>
                <MobileCarousel>{productCards}</MobileCarousel>
            </div>
          )
      } else if (selectedCategory === 'food' && selectedSubCategory === 'Snacks') {
          items = config.offerings.food[selectedSubCategory as keyof typeof config.offerings.food].items;
          const productCards = items.map(item => <ProductCard key={item.name} item={item} />);
          return (
            <div>
               <Button variant="ghost" onClick={() => setSelectedSubCategory(null)} className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to {selectedCategory}
              </Button>
                <DesktopGrid>{productCards}</DesktopGrid>
                <MobileCarousel>{productCards}</MobileCarousel>
            </div>
          )
      } else if (selectedCategory === 'food' && selectedSubCategory === 'Beverages') {
          const beverageCategories = Object.keys(config.offerings.food.Beverages);
          const categoryCards = beverageCategories.map(beverageCat => {
              const firstItem = config.offerings.food.Beverages[beverageCat as keyof typeof config.offerings.food.Beverages].items[0];
              return <CategoryCard 
                          key={beverageCat}
                          title={beverageCat}
                          imageUrl={firstItem.imageUrl}
                          imageHint={firstItem.imageHint}
                          onClick={() => setSelectedSubSubCategory(beverageCat)}
                      />
          });
          return (
            <div>
                <Button variant="ghost" onClick={() => setSelectedSubCategory(null)} className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Food
                </Button>
                <div className="hidden md:grid md:grid-cols-2">{categoryCards}</div>
                <MobileCarousel basis="basis-full">{categoryCards}</MobileCarousel>
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
      
      switch(selectedCategory) {
        case 'cakes':
          const cakeSubCategories = Object.keys(config.offerings.cakes);
          const cakeCategoryCards = cakeSubCategories.map(subCategory => {
              const firstItem = config.offerings.cakes[subCategory as keyof typeof config.offerings.cakes].items[0];
              return <CategoryCard 
                        key={subCategory}
                        title={subCategory}
                        imageUrl={firstItem.imageUrl}
                        imageHint={firstItem.imageHint}
                        onClick={() => setSelectedSubCategory(subCategory)}
                     />
          });
          return (
            <div>
              <Button variant="ghost" onClick={handleBackClick} className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Offerings
              </Button>
              <div className="hidden md:grid md:grid-cols-2">{cakeCategoryCards}</div>
              <MobileCarousel basis="basis-full">{cakeCategoryCards}</MobileCarousel>
            </div>
          );
        case 'flowers':
           const flowerCards = config.offerings.flowers.map(flower => (
                <FlowerCard key={flower.name} item={flower} />
            ));
           return (
            <div>
                <Button variant="ghost" onClick={handleBackClick} className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Offerings
                </Button>
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3">{flowerCards}</div>
                <MobileCarousel>{flowerCards}</MobileCarousel>
            </div>
           );
        case 'food':
          const foodSubCategories = Object.keys(config.offerings.food);
          const foodCategoryCards = foodSubCategories.map(subCategory => {
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
          });
           return (
            <div>
              <Button variant="ghost" onClick={handleBackClick} className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Offerings
              </Button>
              <div className="hidden md:grid md:grid-cols-2">{foodCategoryCards}</div>
              <MobileCarousel basis="basis-full">{foodCategoryCards}</MobileCarousel>
            </div>
          );
        default:
          return null;
      }
    }

    // Level 1: Show main category cards
    const { cakes, flowers, food } = config.offerings;
    const mainCategories = (
        <>
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
        </>
    );

    return (
        <>
            <div className="hidden md:grid md:grid-cols-3">{mainCategories}</div>
            <MobileCarousel>{mainCategories}</MobileCarousel>
        </>
    );
  };


  return (
    <section id="offerings" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto md:px-6">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-headline text-foreground">Our Offerings</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">From celebration cakes to hand-tied bouquets, every creation is a piece of art.</p>
        </div>
        
        <div key={getAnimationKey()} className="animate-zoom-in">
            {renderContent()}
        </div>

      </div>
    </section>
  );
}
