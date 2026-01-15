
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ProductSection from '@/components/sections/product-section';
import { config } from '@/app/config';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CakesPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="container mx-auto">
            <Button asChild variant="outline" className="my-6">
                <Link href="/#best-selling-cakes">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
        </div>
        <ProductSection
          title="All Cakes"
          subtitle="Browse our entire collection of delicious cakes"
          items={config.productSections.allCakes}
          bgColor="bg-white"
          showViewAll={false}
        />
      </main>
      <Footer />
    </>
  );
}

    