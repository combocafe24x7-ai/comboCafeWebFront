"use client";

import { config } from '@/app/config.tsx';
import { Button } from '@/components/ui/button';

export default function FinalCta() {
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-28">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">{config.finalCta.headline}</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">{config.finalCta.description}</p>
        <Button 
            variant="outline"
            size="lg"
            onClick={() => handleScrollTo('contact')}
            className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold px-8 py-6 text-base"
        >
            {config.finalCta.buttonText}
        </Button>
      </div>
    </section>
  );
}
