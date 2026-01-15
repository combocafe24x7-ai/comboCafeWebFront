
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { config } from '@/app/config';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function MenuPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="container mx-auto py-6">
            <Button asChild variant="outline" className="mb-6">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">{config.menu.title}</h1>
                <p className="mt-2 text-lg text-muted-foreground">{config.menu.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {config.menu.images.map((image) => (
                    <div key={image.id} className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            layout="fill"
                            objectFit="cover"
                            className="transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

    