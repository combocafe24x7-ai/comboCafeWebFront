import { config } from '@/app/config.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const CategoryCard = ({ item }: { item: { name: string; description: string; imageUrl: string; imageHint: string; } }) => (
  <Card className="overflow-hidden group border-0 shadow-lg dark:shadow-black/20 hover:shadow-xl transition-shadow duration-300 rounded-lg">
    <CardHeader className="p-0">
      <div className="aspect-square relative">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={item.imageHint} />
      </div>
    </CardHeader>
    <CardContent className="p-6 bg-card">
      <CardTitle className="font-headline text-2xl text-foreground">{item.name}</CardTitle>
      <p className="text-muted-foreground mt-2 font-body">{item.description}</p>
    </CardContent>
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
        
        <div className="mb-16">
          <h3 className="text-3xl font-headline mb-8 text-center md:text-left">Cakes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {config.offerings.cakes.map(cake => (
              <CategoryCard key={cake.name} item={cake} />
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-headline mb-8 text-center md:text-left">Flowers</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.offerings.flowers.map(flower => (
              <CategoryCard key={flower.name} item={flower} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-headline mb-8 text-center md:text-left">Food</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.offerings.food.map(item => (
              <CategoryCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
