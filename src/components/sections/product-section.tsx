"use client";
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';
import type { Product } from '@/context/cart-provider';


type ProductSectionProps = {
    id?: string;
    title?: string;
    subtitle?: string;
    items: Product[];
    bgColor?: string;
    viewAllLink?: string;
    showViewAll?: boolean;
    prioritizeImages?: boolean;
};

export default function ProductSection({ id, title, subtitle, items, bgColor = 'bg-background', viewAllLink = "#", showViewAll = true, prioritizeImages = false }: ProductSectionProps) {

    // If there's no title, we assume it's being used just to render a grid of cards
    if (!title) {
        return (
            <>
                {items.map((item, index) => (
                    <ProductCard key={item.id} item={item} priority={prioritizeImages && index < 2} />
                ))}
            </>
        )
    }

    return (
        <section id={id} className={bgColor}>
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    {title && <h2 className="text-3xl font-semibold">{title}</h2>}
                    {subtitle && <p className="text-muted-foreground mt-1 text-ui">{subtitle}</p>}
                    <div className="w-20 h-px bg-soft-divider mx-auto mt-4"></div>
                </div>

                {id === 'hot-beverages' || id === 'quick-bites' ? (
                    <div className="md:hidden">
                        <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 scrollbar-hide">
                            {items.map((item, index) => (
                                <div key={item.id} className="w-[173px] shrink-0">
                                    <ProductCard item={item} priority={prioritizeImages && index < 4} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

                <div className={cn(
                    "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6",
                    (id === 'hot-beverages' || id === 'quick-bites') && 'hidden md:grid'
                )}>
                    {items.map((item, index) => (
                        <ProductCard key={item.id} item={item} priority={prioritizeImages && index < 4} />
                    ))}
                </div>

                {showViewAll && viewAllLink && (
                    <div className="text-center mt-10">
                        <Button variant="outline" asChild size="lg" className="border-primary-dark/50 text-primary-dark hover:bg-primary-dark/10" suppressHydrationWarning>
                            <Link href={viewAllLink}>View All</Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
