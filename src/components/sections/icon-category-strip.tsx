
'use client';

import React from 'react';
import { config } from '@/app/config';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function IconCategoryStrip() {

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-start justify-around gap-x-2 md:gap-x-4 overflow-x-auto scrollbar-hide p-4">
          {config.iconCategories.map((category: any) => (
          <Link
              href={category.href}
              key={category.id}
              className={cn(
                "group w-20 text-center shrink-0 flex flex-col items-center gap-2"
              )}
          >
              <div className="relative w-16 h-16 rounded-full bg-card flex items-center justify-center shadow-md border border-black/5 transition-all duration-300 group-hover:shadow-card group-hover:border-primary/50 group-hover:-translate-y-1 overflow-hidden">
                  <Image src={category.imageUrl} alt={category.label} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 className="font-semibold text-xs text-text/80 group-hover:text-text transition-colors duration-300 text-ui leading-tight">
                {category.label}
              </h4>
          </Link>
          ))}
      </div>
    </div>
  );
}
