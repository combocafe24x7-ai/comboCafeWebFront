
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import ServiceStrip from '@/components/sections/service-strip';
import ProductSection from '@/components/sections/product-section';
import GiftFinder from '@/components/sections/gift-finder';
import HorizontalCollection from '@/components/sections/horizontal-collection';
import { config } from './config';
import IconCategoryStrip from '@/components/sections/icon-category-strip';
import FreeDeliveryPill from '@/components/mobile/FreeDeliveryPill';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main>
        <div className="md:hidden pt-4">
          <FreeDeliveryPill />
        </div>
        <Hero />
        <IconCategoryStrip />

        <section className="hidden md:block bg-white py-8">
            <div className="container mx-auto">
                <div className="relative aspect-[350/65] w-full overflow-hidden rounded-lg">
                    <Image
                        src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/image%20(3).png"
                        alt="Free delivery banner"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </div>
        </section>

        <ServiceStrip />
        <ProductSection
          id="best-selling-cakes"
          title="Best Selling Cakes"
          subtitle="Loved by everyone"
          items={config.productSections.bestSellingCakes}
          viewAllLink="/cakes"
        />

        <section className="bg-white py-8">
          <div className="container mx-auto">
            <div className="relative aspect-[3/1] rounded-lg overflow-hidden">
              <Image
                src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/image%20(4).png"
                alt="Promotional Banner"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </section>

        <ProductSection 
          id="top-gifts"
          title="Top Gifts"
          subtitle="A selection of our finest gift items"
          items={config.productSections.gifts.slice(0, 4)}
          bgColor="bg-accent"
          viewAllLink="/gifts"
        />
        <GiftFinder />
        <ProductSection
          id="quick-bites"
          title="Quick Bites"
          subtitle="Delicious and savory snacks"
          items={config.productSections.snacks.slice(0, 4)}
          bgColor="bg-white"
          showViewAll={true}
          viewAllLink="/food"
        />
        <ProductSection
          id="hot-beverages"
          title="Hot Beverages"
          subtitle="Warm up with our selection of coffees and more"
          items={config.productSections.hotBeverages.slice(0, 4)}
          bgColor="bg-section-alternate"
          showViewAll={true}
          viewAllLink="/food"
        />
        <ProductSection
          id="flowers-more"
          title="Flowers & More"
          subtitle="Fresh arrangements and thoughtful gifts"
          items={config.productSections.flowerProducts.slice(0, 4)}
          showViewAll={true}
          viewAllLink="/flowers"
        />
        <HorizontalCollection 
          title="Delectable Cakes"
          items={config.collections.cakes}
          bgColor="bg-accent"
          viewAllLink="/cakes"
        />
      </main>
      <Footer />
    </>
  );
}
