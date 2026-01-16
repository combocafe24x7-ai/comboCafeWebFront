
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="container mx-auto py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Coming Soon!</h1>
          <p className="text-lg text-gray-600 mb-8">
            We are working hard to bring this feature to you. Please check back later.
          </p>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
