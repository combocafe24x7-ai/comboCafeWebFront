

import ProductSection from '@/components/sections/product-section';
import GiftFinder from '@/components/sections/gift-finder';
import { config } from './config';
import Image from 'next/image';
import HorizontalCollection from '@/components/sections/horizontal-collection';
import IconCategoryStrip from '@/components/sections/icon-category-strip';
import Hero from '@/components/sections/hero';

const BestSellingSection = () => (
  <section className="bg-background py-16">
    <div className="container mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">Best Selling Cakes</h2>
        <p className="text-muted-foreground mt-1 text-ui">Adored by our customers as top picks</p>
        <div className="w-20 h-px bg-soft-divider mx-auto mt-4"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <ProductSection items={config.productSections.bestSellingCakes} prioritizeImages={true} />
        </div>
        <div className="md:col-span-1 hidden md:block">
          <GiftFinder />
        </div>
      </div>
    </div>
  </section>
);


export default function Home() {
  return (
    <main className="bg-background">
      <Hero />
      
      <IconCategoryStrip />

      <div className="relative w-full aspect-[2.5/1]">
        <Image
          src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/1ChatGPT%20Image%20Jan%2020,%202026,%2003_26_56%20PM_upscayl_2x_digital-art-4x.webp"
          alt="Delectable Cakes Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <HorizontalCollection
        title="Delectable Cakes"
        items={config.collections.cakes}
        bgColor="bg-background"
        viewAllLink="/cakes"
        prioritizeImages={true}
      />
      
      <ProductSection
        id="quick-bites"
        title="Quick Bites"
        subtitle="Delicious and savory snacks"
        items={config.productSections.snacks.slice(0, 4)}
        bgColor="bg-accent"
        showViewAll={true}
        viewAllLink="/food"
      />

      <div className="relative w-full aspect-[3/1]">
        <Image
          src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/ChatGPT%20Image%20Jan%2020,%202026,%2003_m33_32%20PM_upscayl_2x_digital-art-4x.webp"
          alt="Hot Beverages Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <ProductSection
        id="hot-beverages"
        title="Hot Beverages"
        subtitle="Warm up with our selection of coffees and more"
        items={config.productSections.hotBeverages.slice(0, 4)}
        bgColor="bg-background"
        showViewAll={true}
        viewAllLink="/food"
      />
       <ProductSection
        id="top-gifts"
        title="Thoughtful Gifts"
        subtitle="Find the perfect present for your loved ones"
        items={config.productSections.gifts.slice(0, 4)}
        bgColor="bg-accent"
        showViewAll={true}
        viewAllLink="/gifts"
      />
       <ProductSection
        id="flowers-and-more"
        title="Flowers &amp; More"
        subtitle="Fresh arrangements for any occasion"
        items={config.productSections.flowerProducts.slice(0, 4)}
        bgColor="bg-background"
        showViewAll={true}
        viewAllLink="/flowers"
      />
    </main>
  );
}
