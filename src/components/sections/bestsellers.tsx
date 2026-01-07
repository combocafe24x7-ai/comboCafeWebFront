import { config } from '@/app/config.tsx';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function BestSellers() {
  return (
    <section id="bestsellers" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground">Our Best Sellers</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Discover the favorites that our customers can't get enough of.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.bestsellers.map(item => (
            <Card key={item.name} className="overflow-hidden group border-0 shadow-lg dark:shadow-black/20 hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <div className="relative aspect-video">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={item.imageHint}/>
                <Badge variant="default" className="absolute top-4 right-4 bg-primary text-primary-foreground font-bold">
                  {item.tag}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-headline text-2xl text-foreground">{item.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
