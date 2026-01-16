
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { config } from '@/app/config';
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover";
import { Button } from '../ui/button';

type Product = {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
    badge?: string;
};

const allProducts: Product[] = Array.from(new Set([ // Use Set to remove duplicates
    ...config.productSections.bestSellingCakes,
    ...config.productSections.allCakes,
    ...config.productSections.gifts,
    ...config.collections.cakes.map(c => ({...c, id: c.id || c.title, name: c.title, price: c.price || '0', description: c.description || ''})),
    ...config.productSections.foodItems,
]));


export default function MobileSearch() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            const filtered = allProducts.filter(product => {
                const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term);
                const productName = product.name.toLowerCase();
                return searchTerms.some(term => productName.includes(term));
            });
            setSuggestions(filtered.slice(0, 5));
            setIsPopoverOpen(filtered.length > 0);
        } else {
            setSuggestions([]);
            setIsPopoverOpen(false);
        }
    }, [searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPopoverOpen(false);
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleSuggestionClick = () => {
        setIsPopoverOpen(false);
        setSearchQuery('');
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <form onSubmit={handleSearchSubmit} className="flex items-center border rounded-md relative bg-gray-100">
                <PopoverAnchor asChild>
                    <div className="flex-grow flex items-center">
                        <input
                            type="search"
                            name="search"
                            id="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full bg-transparent pl-3 pr-4 py-2 text-sm placeholder:text-gray-500 focus:outline-none"
                            placeholder="Search Combo Cafe..."
                            autoComplete="off"
                        />
                        <Button type="submit" variant="ghost" size="icon" className="w-10 h-10">
                            <Search className="h-5 w-5 text-gray-500" />
                        </Button>
                    </div>
                </PopoverAnchor>
            </form>
            <PopoverContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="w-[--radix-popover-trigger-width] mt-1"
            >
                <div className="space-y-2">
                    {suggestions.map((product) => (
                        <Link
                            key={product.id}
                            href={`/search?q=${encodeURIComponent(product.name)}`}
                            className="block p-2 -m-2 rounded-md hover:bg-accent"
                            onClick={handleSuggestionClick}
                        >
                            <p className="text-sm font-medium truncate">{product.name}</p>
                        </Link>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

    