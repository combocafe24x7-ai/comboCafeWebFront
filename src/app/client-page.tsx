"use client";

import { useState, useEffect, useRef } from 'react';
import Preloader from '@/components/preloader';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Offerings from '@/components/sections/offerings';
import Menu from '@/components/sections/menu';
import BestSellers from '@/components/sections/bestsellers';
import Faq from '@/components/sections/faq';
import Contact from '@/components/sections/contact';
import FinalCta from '@/components/sections/final-cta';
import { cn } from '@/lib/utils';

export default function ClientPage() {
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Hide preloader after a short delay to allow assets to start loading.
        const timer = setTimeout(() => setIsLoading(false), 500); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Preloader isLoading={isLoading} />
            <div className={cn("transition-opacity duration-1000", isLoading ? 'opacity-0' : 'opacity-100')}>
                <Header />
                <main>
                    <Hero videoRef={videoRef} />
                    <Offerings />
                    <Menu />
                    <BestSellers />
                    <Faq />
                    <Contact />
                    <FinalCta />
                </main>
                <Footer />
            </div>
        </>
    );
}
