
"use client"

import * as React from 'react';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { config } from '@/app/config.tsx';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { OfferingCategory } from './sections/offerings';

type SearchSuggestion = {
    name: string;
    category: OfferingCategory;
    subCategory?: string;
    subSubCategory?: string;
    type: 'product' | 'category';
};

type SearchBarProps = {
    onNavSelect: (path: string) => void;
    onExplore: (category: OfferingCategory) => void;
}

const getAllProducts = () => {
    const products: SearchSuggestion[] = [];
    const offerings = config.offerings;

    // Cakes
    for (const subCat in offerings.cakes) {
        products.push({ name: subCat, category: 'cakes', subCategory: subCat, type: 'category' });
        for (const item of offerings.cakes[subCat as keyof typeof offerings.cakes].items) {
            products.push({ name: item.name, category: 'cakes', subCategory: subCat, type: 'product' });
        }
    }

    // Flowers
    products.push({ name: 'Flowers', category: 'flowers', type: 'category' });
    for (const item of offerings.flowers) {
        products.push({ name: item.name, category: 'flowers', type: 'product' });
    }

    // Food
    for (const subCat in offerings.food) {
        if (subCat === 'Beverages') {
            for (const subSubCat in offerings.food.Beverages) {
                products.push({ name: subSubCat, category: 'food', subCategory: 'Beverages', subSubCategory: subSubCat, type: 'category' });
                for (const item of offerings.food.Beverages[subSubCat as keyof typeof offerings.food.Beverages].items) {
                    products.push({ name: item.name, category: 'food', subCategory: 'Beverages', subSubCategory: subSubCat, type: 'product' });
                }
            }
        } else {
            products.push({ name: subCat, category: 'food', subCategory: subCat, type: 'category' });
            for (const item of offerings.food[subCat as keyof typeof offerings.food].items) {
                products.push({ name: item.name, category: 'food', subCategory: subCat, type: 'product' });
            }
        }
    }
    return products;
}

export default function SearchBar({ onNavSelect, onExplore }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const allProducts = useMemo(getAllProducts, []);

    const filteredSuggestions = useMemo(() => {
        if (!query) return [];
        return allProducts
            .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5);
    }, [query, allProducts]);
    
    const handleSuggestionClick = (suggestion: SearchSuggestion) => {
        const path = [suggestion.category, suggestion.subCategory, suggestion.subSubCategory].filter(Boolean).join(':');
        onNavSelect(path);
        setQuery('');
    }

    const handleCategoryClick = (category: OfferingCategory) => {
        onExplore(category);
    }

    return (
        <div className="relative">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input 
                    type="text" 
                    placeholder="Search for cakes, flowers, coffee..." 
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder:text-gray-300 border-2 border-white/30 focus:bg-white/30 focus:border-white/50 backdrop-blur-sm transition-all"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {filteredSuggestions.length > 0 && (
                 <div className="absolute bottom-full mb-2 w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-200/50">
                     <ul className="divide-y divide-gray-200/50">
                        {filteredSuggestions.map((suggestion, index) => (
                            <li key={`${suggestion.name}-${index}`}>
                                <button onClick={() => handleSuggestionClick(suggestion)} className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100/50 transition-colors flex justify-between items-center">
                                    <span>{suggestion.name}</span>
                                    <span className="text-xs uppercase font-semibold text-gray-500 bg-gray-200/70 rounded-md px-2 py-0.5">{suggestion.type}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <div className="flex justify-center gap-2 mt-3">
                {(['cakes', 'flowers', 'food'] as const).map(cat => (
                    <Button key={cat} onClick={() => handleCategoryClick(cat)} size="sm" variant="ghost" className="capitalize bg-white/10 text-white rounded-full hover:bg-white/20">
                        {cat}
                    </Button>
                ))}
            </div>

        </div>
    );
}
