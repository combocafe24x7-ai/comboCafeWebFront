import { config } from '@/app/config.tsx';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const MenuCategory = ({ title, items }: { title: string, items: { name: string, price: string }[] }) => (
    <div>
        <h3 className="text-2xl md:text-3xl font-headline text-primary mb-6">{title}</h3>
        <ul className="space-y-6">
            {items.map((item, index) => (
            <li key={item.name}>
                <div className="flex justify-between items-start gap-4">
                <div>
                    <h4 className="font-body font-bold text-lg text-foreground">{item.name}</h4>
                </div>
                <p className="font-body font-bold text-lg text-primary flex-shrink-0">{item.price}</p>
                </div>
                {index < items.length - 1 && <Separator className="mt-6" />}
            </li>
            ))}
        </ul>
    </div>
);

export default function Menu() {
  return (
    <section id="menu" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground">Café Menu</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A moment of pure enjoyment in every cup and on every plate.</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg dark:shadow-black/20">
          <CardContent className="p-6 md:p-10 space-y-12">
            <MenuCategory title="☕ Hot Coffee" items={config.menu.hotCoffee} />
            <Separator />
            <MenuCategory title="🧊 Cold Beverages" items={config.menu.coldBeverages} />
            <Separator />
            <MenuCategory title="🍰 Cakes & Desserts" items={config.menu.cakesAndDesserts} />
            <Separator />
            <MenuCategory title="🎂 Celebration Cakes (Order)" items={config.menu.celebrationCakes} />
            <Separator />
            <MenuCategory title="🌸 Flowers & Gifts" items={config.menu.flowersAndGifts} />
            <Separator />
            <MenuCategory title="🥪 Snacks" items={config.menu.snacks} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
