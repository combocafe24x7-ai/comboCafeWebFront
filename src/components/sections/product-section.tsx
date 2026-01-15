
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Badge } from '../ui/badge';

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
};

const ProductCard = ({ item }: { item: Product }) => (
  <Card className="overflow-hidden group shadow-subtle hover:shadow-lg transition-shadow duration-300 border-0 rounded-lg">
    <CardContent className="p-0">
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
      <div className="p-4">
        <h4 className="font-medium text-sm text-gray-800 truncate">{item.name}</h4>
        <p className="text-xs text-gray-500 mt-1 h-8 leading-4">{item.description}</p>
        <p className="font-semibold text-gray-900 mt-2">{item.price}</p>
      </div>
    </CardContent>
  </Card>
);

export default function ProductSection({ title, subtitle, items, bgColor = 'bg-white' }: ProductSectionProps) {
  return (
    <section className={bgColor}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-semibold">{title}</h2>
            {subtitle && <p className="text-md text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <Button variant="outline">View All</Button>
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

    