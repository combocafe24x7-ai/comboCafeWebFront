import { config } from '@/app/config';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Menu() {
  return (
    <section id="menu" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground">Café Menu</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A moment of pure enjoyment in every cup and on every plate.</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg dark:shadow-black/20">
          <CardContent className="p-6 md:p-10">
            <ul className="space-y-6">
              {config.menu.items.map((item, index) => (
                <li key={item.name}>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-body font-bold text-lg text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <p className="font-body font-bold text-lg text-primary flex-shrink-0">{item.price}</p>
                  </div>
                  {index < config.menu.items.length - 1 && <Separator className="mt-6" />}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
