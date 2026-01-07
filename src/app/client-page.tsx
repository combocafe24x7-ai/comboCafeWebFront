
"use client";

import { useState, useEffect, useRef } from 'react';
import Preloader from '@/components/preloader';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Offerings from '@/components/sections/offerings';
import Menu from '@/components/sections/menu';
import BestSellers from '@/components/sections/bestsellers';
import Contact from '@/components/sections/contact';
import FinalCta from '@/components/sections/final-cta';
import { cn } from '@/lib/utils';
import Faq from '@/components/sections/faq';
import type { OfferingCategory, SubCategory, SubSubCategory } from '@/components/sections/offerings';
import { config } from './config.tsx';

export default function ClientPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [exploreClicked, setExploreClicked] = useState(false);
    const [navigatedCategory, setNavigatedCategory] = useState<{ category: OfferingCategory, subCategory?: SubCategory, subSubCategory?: SubSubCategory} | null>(null);
    const [heroAccentColor, setHeroAccentColor] = useState(config.hero.categories[0].accentColor);

    useEffect(() => {
        // Hide preloader after a short delay.
        const timer = setTimeout(() => setIsLoading(false), 500); 
        return () => clearTimeout(timer);
    }, []);

    const handleExplore = (category: OfferingCategory) => {
        setExploreClicked(true);
        setNavigatedCategory({ category });
        document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleNavSelect = (path: string) => {
        const [category, subCategory, subSubCategory] = path.split(':') as [OfferingCategory, SubCategory?, SubSubCategory?];
        setNavigatedCategory({ category, subCategory, subSubCategory });
        document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Preloader isLoading={isLoading} />
            <div className={cn("transition-opacity duration-1000", isLoading ? 'opacity-0' : 'opacity-100')}>
                <Header onNavSelect={handleNavSelect} heroAccentColor={heroAccentColor} />
                <main>
                    <Hero onExplore={handleExplore} onCategoryChange={(color) => setHeroAccentColor(color)} />
                    <div className="hidden md:block">
                        <BestSellers />
                    </div>
                    <Offerings 
                        initialCategoryState={navigatedCategory}
                        exploreClicked={exploreClicked || !!navigatedCategory}
                        onResetExplore={() => {
                            setExploreClicked(false);
                            setNavigatedCategory(null);
                        }}
                    />
                    <div className="hidden md:block">
                        <Menu />
                    </div>
                    <Contact />
                    <FinalCta />
                </main>
                <Footer />
            </div>
        </>
    );
}

    