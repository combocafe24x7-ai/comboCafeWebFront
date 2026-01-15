
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type CollectionItem = {
  title: string;
  imageUrl: string;
  description?: string;
  price?: string;
};

type HorizontalCollectionProps = {
  title: string;
  items: CollectionItem[];
  bgColor?: string;
};

const CollectionCard = ({ item }: { item: CollectionItem }) => (
  <Card className="overflow-hidden group border-0 rounded-lg">
    <CardContent className="p-0">
      <a href="#" className="block">
        <div className="relative aspect-[4/5]">
          <Image 
            src={item.imageUrl} 
            alt={item.title} 
            layout="fill" 
            className="object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
              <h4 className="font-semibold text-lg text-white truncate">{item.title}</h4>
              {item.description && <p className="text-xs text-gray-200 mt-1 truncate">{item.description}</p>}
          </div>
        </div>
        {item.price && (
          <div className="p-3 bg-white">
            <p className="font-semibold text-gray-900 text-sm">{item.price}</p>
          </div>
        )}
      </a>
    </CardContent>
  </Card>
);

export default function HorizontalCollection({ title, items, bgColor = 'bg-white' }: HorizontalCollectionProps) {
  return (
    <section className={bgColor}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <Button variant="outline">View All</Button>
        </div>
        <Carousel
            opts={{
                align: "start",
                slidesToScroll: "auto",
            }}
             className="w-full"
        >
            <CarouselContent className="-ml-4">
                {items.map((item, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/4 lg:basis-1/5">
                        <CollectionCard item={item} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10" />
        </Carousel>
      </div>
    </section>
  );
}

    