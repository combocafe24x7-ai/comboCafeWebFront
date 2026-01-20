
'use client';

import React from 'react';
import { config } from '@/app/config';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function IconCategoryStrip() {

  return (
    <section className="py-8">
        <div className="container mx-auto">
            <div className="flex items-center justify-center gap-x-4 md:gap-x-6 lg:gap-x-8 overflow-x-auto scrollbar-hide">
                {config.iconCategories.map((category: any) => (
                <Link
                    href={category.href}
                    key={category.id}
                    className={cn(
                    "group w-24 text-center shrink-0 flex flex-col items-center gap-2"
                    )}
                >
                    <div className="relative w-20 h-20 rounded-xl bg-card flex items-center justify-center shadow-subtle border border-black/5 transition-all duration-300 group-hover:shadow-card group-hover:border-primary/50 group-hover:-translate-y-1 overflow-hidden">
                        <Image src={category.imageUrl} alt={category.label} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h4 className="font-semibold text-sm text-text/80 group-hover:text-text transition-colors duration-300 text-ui leading-tight">
                    {category.label}
                    </h4>
                </Link>
                ))}
            </div>
        </div>
    </section>
  );
}
