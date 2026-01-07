"use client";

import { config } from '@/app/config';
import { cn } from '@/lib/utils';

export default function Preloader({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500',
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-headline text-primary mb-4">{config.brand.name}</h1>
        <div className="w-12 h-12 border-4 border-primary/50 border-t-primary rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
