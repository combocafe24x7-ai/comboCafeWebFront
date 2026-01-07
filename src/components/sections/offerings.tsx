
"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import { config } from '@/app/config.tsx';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Phone, ShoppingCart, ArrowLeft, Mail } from 'lucide-react';
import { useCart } from '@/context/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { OrderForm } from '../order-form';

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

// A custom component for the WhatsApp icon
const WhatsAppIcon = (props: React.ComponentProps<'svg'>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="WhatsApp"
    >
      <path d="M16.75 13.96c.25.13.42.2.46.3.05.1.05.75-.2 1.3-.25.55-1.12 1.1-1.52 1.25-.4.15-1.07.13-1.6-.08s-2.15-1-3.6-2.5c-1.15-1.15-2-2.5-2.2-2.9-.2-.4-.04-.6.12-.77.16-.17.35-.2.5-.2s.33.02.47.22c.14.2.3.66.35.7.05.05.07.12.02.2-.05.08-.1.18-.2.25-.1.08-.2.12-.25.2-.06.07-.12.15-.05.27.07.12.33.56.7.92.56.5.94.75 1.1.8.14.05.24.03.32-.03.1-.06.42-.5.54-.66.12-.17.22-.15.32-.1.1.04.65.3.75.36zM12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c1.85 0 3.55-.5 5-1.35l-1.3-1.3c-1.1.5-2.35.8-3.7.8a8 8 0 1 1 8-8c0 1.35-.3 2.6-.8 3.7l1.3 1.3C21.5 15.55 22 13.85 22 12A10 10 0 0 0 12 2z"/>
    </svg>
);

const parsePrice = (price: string) => {
    if (typeof price !== 'string') return 0;
    const cleanedPrice = price.replace(/Rs\.?/i, '').replace(/,/g, '').trim();
    const numericPrice = parseFloat(cleanedPrice);
    return isNaN(numericPrice) ? 0 : numericPrice;
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

  const handleWhatsAppOrder = (details: Record<string, string>) => {
    const messageHeader = `I'd like to place an order for the following item:\n\n*Order Summary:*`;
    const orderItem = `- ${item.name} (${item.price})`;
    const total = `\n*Total: ${item.price}*`;

    const customerDetails = `\n\n*Delivery Details:*\n` +
        `Name: ${details.firstName} ${details.lastName}\n` +
        `Phone: ${details.phoneNumber}\n` +
        (details.emailId ? `Email: ${details.emailId}\n` : '') +
        `Address: ${details.address}\n` +
        (details.houseNumber ? `  House No: ${details.houseNumber}\n` : '') +
        (details.streetNumber ? `  Street: ${details.streetNumber}\n` : '') +
        `  Landmark: ${details.landmarks}\n` +
        `  Pincode: ${details.pincode}\n` +
        `Delivery Date: ${details.deliveryDate}\n` +
        `Delivery Time: ${details.deliveryHours}`;
    
    const message = encodeURIComponent([messageHeader, orderItem, total, customerDetails].join('\n'));
    const url = `https://wa.me/${config.contact.phone}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getDiscount = () => {
    if (!item.originalPrice || !item.price) return null;
    const original = parsePrice(item.originalPrice);
    const current = parsePrice(item.price);
    
    if (original <= current) return null;
    
    const percentage = Math.round(((original - current) / original) * 100);
    const saved = original - current;
    return { percentage, saved };
  }

  const discount = getDiscount();

  return (
    <Card className="overflow-hidden group border-0 shadow-lg dark:shadow-black/20 hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-lg h-full">
      <div className="relative w-full" style={{ paddingBottom: '100%' }}>
        {discount && (
          <Badge 
            variant="destructive" 
            className="absolute top-2 right-2 z-10"
          >
            {discount.percentage}% OFF
          </Badge>
        )}
        <Image src={item.imageUrl} alt={item.name} layout="fill" className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={item.imageHint} />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex-grow mb-2">
            <CardTitle className="font-headline text-xl text-foreground mb-1 line-clamp-1">{item.name}</CardTitle>
            {item.description && <p className="text-muted-foreground font-body text-sm line-clamp-2 h-10">{item.description}</p>}
        </div>
        <div>
            <div className="flex items-baseline gap-2">
                <p className="text-primary font-bold text-lg">{item.price}</p>
                {item.originalPrice && <p className="text-muted-foreground line-through text-sm">{item.originalPrice}</p>}
            </div>
            {discount && <p className="text-xs text-green-600 font-semibold">You save Rs{discount.saved.toFixed(0)}!</p>}
        </div>
      </CardContent>
      <CardFooter className="p-2 border-t flex flex-col gap-2">
        <div className="flex gap-2 w-full">
            <Button onClick={handleAddToCart} size="sm" className="w-full text-xs rounded-sm h-9">
                <ShoppingCart className="mr-2 h-4 w-4" /> Cart
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full text-xs rounded-sm h-9">
                <a href={`tel:${config.contact.phone}`}>
                    <Phone className="mr-2 h-4 w-4" /> Call
                </a>
            </Button>
        </div>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="w-full text-xs rounded-sm h-9 bg-blue-400 text-white hover:bg-blue-500">
                    Order on WhatsApp
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[90vw] sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Delivery Information</SheetTitle>
                    <SheetDescription>
                        Please provide your details to place an order for <span className="font-bold">{item.name}</span>.
                    </SheetDescription>
                </SheetHeader>
                <OrderForm 
                    onSubmit={handleWhatsAppOrder}
                    totalPrice={parsePrice(item.price)}
                />
            </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
};

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
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <CarouselItem className={cn("pl-4", basis || 'basis-4/5 sm:basis-1/2')}>{child}</CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
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
                <MobileCarousel basis="basis-2/3 sm:basis-1/2 md:basis-1/3">{productCards}</MobileCarousel>
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
                <MobileCarousel basis="basis-2/3 sm:basis-1/2 md:basis-1/3">{productCards}</MobileCarousel>
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
                <MobileCarousel basis="basis-2/3 sm:basis-1/2 md:basis-1/3">{productCards}</MobileCarousel>
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
                <DesktopGrid>{categoryCards}</DesktopGrid>
                <MobileCarousel>{categoryCards}</MobileCarousel>
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
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Product Categories
              </Button>
              <DesktopGrid>{cakeCategoryCards}</DesktopGrid>
              <MobileCarousel>{cakeCategoryCards}</MobileCarousel>
            </div>
          );
        case 'flowers':
           const flowerCards = config.offerings.flowers.map(flower => (
                <ProductCard key={flower.name} item={flower} />
            ));
           return (
            <div>
                <Button variant="ghost" onClick={handleBackClick} className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Product Categories
                </Button>
                <DesktopGrid>{flowerCards}</DesktopGrid>
                <MobileCarousel basis="basis-2/3 sm:basis-1/2 md:basis-1/3">{flowerCards}</MobileCarousel>
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
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Product Categories
              </Button>
              <DesktopGrid>{foodCategoryCards}</DesktopGrid>
              <MobileCarousel>{foodCategoryCards}</MobileCarousel>
            </div>
          );
        default:
          return null;
      }
    }

    // Level 1: Show main category cards
    const { cakes, flowers, food } = config.offerings;
    const mainCategories = [
      <CategoryCard 
          key="cakes"
          title="Cakes" 
          imageUrl={cakes["Cakes & Desserts"].items[0].imageUrl}
          imageHint={cakes["Cakes & Desserts"].items[0].imageHint}
          onClick={() => setSelectedCategory('cakes')}
      />,
      <CategoryCard 
          key="flowers"
          title="Flowers"
          imageUrl={flowers[0].imageUrl}
          imageHint={flowers[0].imageHint}
          onClick={() => setSelectedCategory('flowers')}
      />,
      <CategoryCard 
          key="food"
          title="Food"
          imageUrl={food.Beverages["Hot Beverages"].items[0].imageUrl}
          imageHint={food.Beverages["Hot Beverages"].items[0].imageHint}
          onClick={() => setSelectedCategory('food')}
      />,
    ];

    return (
        <div className="relative">
             <Carousel 
                opts={{ align: "start" }} 
                className="w-full md:hidden"
            >
                <CarouselContent className="-ml-4">
                    {React.Children.map(mainCategories, (child) => (
                        <CarouselItem className="pl-4 basis-4/5 sm:basis-1/2">{child}</CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
            <div className="hidden md:grid md:grid-cols-3 gap-8">
                {mainCategories}
            </div>
        </div>
    );
  };


  return (
    <section id="offerings" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-headline text-foreground">Product Categories</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Explore our delicious cakes, beautiful flowers, and tasty treats.</p>
        </div>
        
        <div key={getAnimationKey()} className="animate-zoom-in">
            {renderContent()}
        </div>

      </div>
    </section>
  );
}
