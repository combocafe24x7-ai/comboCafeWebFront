
import { config } from '@/app/config';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/sections/product-card';

export default function CakesPage() {
  const allCakes = config.productSections.allCakes;
  const midPoint = Math.ceil(allCakes.length / 2);
  const firstHalf = allCakes.slice(0, midPoint);
  const secondHalf = allCakes.slice(midPoint);

  return (
    <main className="bg-white">
      <div className="container mx-auto">
          <Button asChild variant="outline" className="my-6">
              <Link href="/#best-selling-cakes">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
              </Link>
          </Button>
      </div>
      
      <section className="bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold">All Cakes</h2>
            <p className="text-muted-foreground mt-1 text-ui">Browse our entire collection of delicious cakes</p>
            <div className="w-20 h-px bg-soft-divider mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {firstHalf.map((item, index) => (
                <ProductCard key={item.id} item={item} priority={index < 4} />
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto my-8">
        <div className="relative aspect-[3/1] w-full overflow-hidden rounded-lg">
            <Image 
                src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/image%20(1)%20(1).png"
                alt="Special Offer Banner"
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized
            />
        </div>
      </div>

      <section className="bg-white pb-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {secondHalf.map((item) => (
                <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
