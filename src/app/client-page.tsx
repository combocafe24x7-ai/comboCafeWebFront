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
import type { OfferingCategory } from '@/components/sections/offerings';

export default function ClientPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [heroCategory, setHeroCategory] = useState<OfferingCategory>('cakes');
    const [exploreClicked, setExploreClicked] = useState(false);

    useEffect(() => {
        // Hide preloader after a short delay.
        const timer = setTimeout(() => setIsLoading(false), 500); 
        return () => clearTimeout(timer);
    }, []);

    const handleExplore = (category: OfferingCategory) => {
        setHeroCategory(category);
        setExploreClicked(true);
        document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <Preloader isLoading={isLoading} />
            <div className={cn("transition-opacity duration-1000", isLoading ? 'opacity-0' : 'opacity-100')}>
                <Header />
                <main>
                    <Hero onExplore={handleExplore} />
                    <BestSellers />
                    <Offerings 
                        initialCategory={heroCategory}
                        exploreClicked={exploreClicked}
                        onResetExplore={() => setExploreClicked(false)}
                    />
                    <Menu />
                    <Contact />
                    <FinalCta />
                </main>
                <Footer />
            </div>
        </>
    );
}
