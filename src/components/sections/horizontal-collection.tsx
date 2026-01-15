import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from 'next/link';

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
  viewAllLink?: string;
};

const CollectionCard = ({ item }: { item: CollectionItem }) => {
    const phoneNumber = "919474771771";
    const whatsappMessage = `I'd like to inquire about: ${item.title}`;

    return (
    <Card className="overflow-hidden group border-0 rounded-lg shadow-sm flex flex-col h-full">
        <CardContent className="p-0 flex-grow">
            <Link href={`/search?q=${encodeURIComponent(item.title)}`} className="block">
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
            </Link>
            {item.price && (
            <div className="p-3 bg-white">
                <p className="font-semibold text-gray-900 text-sm">{`Rs. ${item.price}`}</p>
            </div>
            )}
        </CardContent>
        <div className="p-3 pt-0 bg-white space-y-2">
            <Button asChild variant="secondary" className="w-full text-xs" size="sm">
                <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                    Order on WhatsApp
                </a>
            </Button>
            <Button asChild variant="outline" className="w-full text-xs" size="sm">
                <a href={`tel:+${phoneNumber}`}>
                    Call to Order
                </a>
            </Button>
      </div>
    </Card>
    );
};

export default function HorizontalCollection({ title, items, bgColor = 'bg-white', viewAllLink = '#' }: HorizontalCollectionProps) {
  return (
    <section className={bgColor}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <Button variant="outline" asChild>
            <Link href={viewAllLink}>View All</Link>
          </Button>
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
                        <div className="h-full">
                            <CollectionCard item={item} />
                        </div>
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
