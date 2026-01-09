

"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import { config } from '@/app/config.tsx';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Phone, ShoppingCart, ArrowLeft, Mail, ChevronRight, MessageSquare } from 'lucide-react';
import { useCart } from '@/context/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { OrderForm } from '../order-form';
import { VisuallyHidden } from '../ui/visually-hidden.tsx';
import { useAccentColor } from '@/context/accent-color-provider';

type Product = {
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  imageHint: string;
  description?: string;
};

export type OfferingCategory = 'cakes' | 'gifts' | 'food';
export type SubCategory = string;
export type SubSubCategory = string;

type OfferingsProps = {
    initialCategoryState: { category: OfferingCategory, subCategory?: SubCategory, subSubCategory?: SubSubCategory } | null;
    exploreClicked: boolean;
    onResetExplore: () => void;
};

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

  const getWhatsAppMessage = (details: Record<string, string>, transactionId: string) => {
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
    
    const paymentDetails = `\n\n*Payment Details:*\nTransaction ID: ${transactionId}`;
    
    const finalMessage = [messageHeader, orderItem, total, customerDetails, paymentDetails].join('\n');
    return encodeURIComponent(finalMessage);
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
  const isStartingAt = item.price && item.price.toLowerCase().includes('starting at');
  const displayPrice = isStartingAt ? item.price.replace(/starting at/i, '').trim() : item.price;
  
  const isCustomGift = item.name === 'Custom Gift';

  return (
    <Card className="overflow-hidden group border-0 shadow-lg dark:shadow-black/20 hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col">
      <div className="relative w-full aspect-square">
        {discount && (
          <Badge 
            variant="destructive" 
            className="absolute top-2 right-2 z-10"
          >
            {discount.percentage}% OFF
          </Badge>
        )}
        <Image src={item.imageUrl} alt={item.name} fill className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={item.imageHint} />
      </div>
      <CardContent className="p-2 flex-grow flex flex-col justify-between">
        <div>
            <CardTitle className="font-headline text-base text-foreground mb-0.5 line-clamp-1">{item.name}</CardTitle>
            {item.description && <p className="text-muted-foreground font-body text-xs line-clamp-2 h-8">{item.description}</p>}
        </div>
        {!isCustomGift && (
            <div className="mt-1.5">
                {isStartingAt && <p className="text-muted-foreground text-xs">Starting at</p>}
                <div className="flex items-baseline gap-2">
                    <p className="text-primary font-bold text-sm">{displayPrice}</p>
                    {item.originalPrice && <p className="text-muted-foreground line-through text-xs">{item.originalPrice}</p>}
                </div>
                {discount && <p className="text-xs text-green-600 font-semibold">Save Rs{discount.saved.toFixed(0)}</p>}
            </div>
        )}
      </CardContent>
       <div className="p-1.5 border-t mt-auto">
        {isCustomGift ? (
          <Button asChild size="sm" className="w-full text-xs rounded-sm h-8">
            <a href={`tel:${config.contact.phone}`}>
              <Phone className="mr-1.5 h-4 w-4" /> Call to Create
            </a>
          </Button>
        ) : (
          <div className="space-y-1.5">
            <div className="flex gap-1.5 w-full">
              <Button onClick={handleAddToCart} size="sm" className="w-full text-xs rounded-sm h-8 flex-1">
                <ShoppingCart className="mr-1.5 h-4 w-4" /> Cart
              </Button>
              <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-sm">
                <a href={`tel:${config.contact.phone}`} aria-label="Call to order">
                  <Phone className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="h-8 rounded-sm bg-green-500 text-white hover:bg-green-600 w-full text-xs">
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
                  getWhatsAppMessage={getWhatsAppMessage}
                  totalPrice={parsePrice(item.price)}
                />
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </Card>
  );
};

const CategoryCard = ({ title, imageUrl, imageHint, onClick }: { title: string; imageUrl: string; imageHint: string, onClick: () => void }) => (
    <div className="relative aspect-square overflow-hidden group cursor-pointer" onClick={onClick}>
        <Image src={imageUrl} alt={title} fill className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={imageHint} />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
            <h3 className="font-headline text-2xl md:text-4xl text-white font-bold text-center">{title}</h3>
            <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 group-hover:bottom-20 transition-all duration-300">
                <Button variant="outline" className="bg-white/20 border-white/50 text-white backdrop-blur-sm hover:bg-white/30">Explore</Button>
            </div>
        </div>
    </div>
);

const ItemsGrid = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
    </div>
);

const SubCategoryGrid = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {children}
    </div>
);


const Breadcrumbs = ({ path, onNavigate }: { path: string[], onNavigate: (index: number) => void }) => {
    const { displayColor } = useAccentColor();
    if (path.length === 0) return null;
    
    return (
        <div className="mb-8 flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
            <Button variant="link" className="p-0 h-auto" onClick={() => onNavigate(-1)} style={{ color: displayColor }}>Home</Button>
            <ChevronRight className="h-4 w-4" />
            {path.map((item, index) => (
                <React.Fragment key={item}>
                    {index < path.length - 1 ? (
                        <>
                            <Button variant="link" className="p-0 h-auto" onClick={() => onNavigate(index)} style={{ color: displayColor }}>
                                {item}
                            </Button>
                            <ChevronRight className="h-4 w-4" />
                        </>
                    ) : (
                        <span className="font-semibold text-foreground">{item}</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};


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

  const handleBreadcrumbNavigate = (index: number) => {
    if (index < 0) { // Home
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setSelectedSubSubCategory(null);
    } else if (index === 0) { // Main Category
        setSelectedSubCategory(null);
        setSelectedSubSubCategory(null);
    } else if (index === 1) { // Sub Category
        setSelectedSubSubCategory(null);
    }
  };


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
            <ItemsGrid>{productCards}</ItemsGrid>
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
              <div className='text-center my-4'>
                  {note && <Badge variant="secondary">{note}</Badge>}
              </div>
                <ItemsGrid>{productCards}</ItemsGrid>
            </div>
          )
      } else if (selectedCategory === 'food' && selectedSubCategory === 'Snacks') {
          items = config.offerings.food[selectedSubCategory as keyof typeof config.offerings.food].items;
          const productCards = items.map(item => <ProductCard key={item.name} item={item} />);
          return (
            <ItemsGrid>{productCards}</ItemsGrid>
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
            <SubCategoryGrid>{categoryCards}</SubCategoryGrid>
          )
      }
    }

    // Level 2: Show sub-categories for the selected main category
    if (selectedCategory) {
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
            <SubCategoryGrid>{cakeCategoryCards}</SubCategoryGrid>
          );
        case 'gifts':
           const giftCards = config.offerings.gifts.map(gift => (
                <ProductCard key={gift.name} item={gift} />
            ));
           return (
            <ItemsGrid>{giftCards}</ItemsGrid>
           );
        case 'food':
          const foodSubCategories = Object.keys(config.offerings.food);
          const foodCategoryCards = foodSubCategories.map(subCategory => {
              const firstItem = (config.offerings.food[subCategory as keyof typeof config.offerings.food] as any).items
                ? (config.offerings.food[subCategory as keyof typeof config.offerings.food] as any).items[0]
                // eslint-disable-next-line
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
            <SubCategoryGrid>{foodCategoryCards}</SubCategoryGrid>
          );
        default:
          return null;
      }
    }

    // Level 1: Show main category cards
    const { cakes, gifts, food } = config.offerings;
    const mainCategories = [
      <CategoryCard 
          key="cakes"
          title="Cakes" 
          imageUrl={cakes["Celebration Cakes"].items[0].imageUrl}
          imageHint={cakes["Celebration Cakes"].items[0].imageHint}
          onClick={() => setSelectedCategory('cakes')}
      />,
      <CategoryCard 
          key="gifts"
          title="Gifts"
          imageUrl={gifts[0].imageUrl}
          imageHint={gifts[0].imageHint}
          onClick={() => setSelectedCategory('gifts')}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mainCategories}
      </div>
    );
  };
  
  const breadcrumbPath = [
      selectedCategory,
      selectedSubCategory,
      selectedSubSubCategory,
    ].filter(Boolean) as string[];


  return (
    <section id="offerings" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        { !selectedCategory ? (
            <div className="text-center mb-12 md:mb-16">
                <VisuallyHidden>
                    <h2>Product Categories</h2>
                </VisuallyHidden>
                <h2 className="text-4xl md:text-5xl font-headline text-foreground">Product Categories</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Explore our delicious cakes, beautiful gifts, and tasty treats.</p>
            </div>
        ) : (
            <div className="mb-12 md:mb-16">
                <Breadcrumbs path={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />
            </div>
        )}
        
        <div key={getAnimationKey()} className="animate-zoom-in">
            {renderContent()}
        </div>

      </div>
    </section>
  );
}
