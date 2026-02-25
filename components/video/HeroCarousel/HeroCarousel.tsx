'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export interface HeroSlide {
    id: number;
    image: string;
    title: string;
    description: string;
    tags: string[];
}

interface HeroCarouselProps {
    slides: HeroSlide[];
    autoPlayInterval?: number;
    className?: string;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
    slides,
    autoPlayInterval = 7000,
    className,
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    // Auto-slide
    useEffect(() => {
        const timer = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(timer);
    }, [nextSlide, autoPlayInterval]);

    if (slides.length === 0) return null;

    return (
        <div className={cn(
            "relative w-full aspect-[4/5] md:aspect-[24/9] max-h-[600px] overflow-hidden rounded-xl group bg-black shadow-2xl shadow-primary/10 border border-white/5",
            className
        )}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            fill
                            className="object-cover"
                            priority={currentSlide === 0}
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-wrap gap-2"
                        >
                            {slides[currentSlide].tags.map(tag => (
                                <div key={tag} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider w-fit shadow-lg shadow-primary/10">
                                    {tag}
                                </div>
                            ))}
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-2xl"
                        >
                            {slides[currentSlide].title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-white/90 line-clamp-2 md:line-clamp-3 text-sm sm:text-base md:text-lg font-medium drop-shadow-md max-w-xl"
                        >
                            {slides[currentSlide].description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto"
                        >
                            <Button className="bg-primary hover:bg-primary/90 text-white font-bold text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                                Watch Now
                            </Button>
                            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 backdrop-blur-md text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 rounded-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                                More Info
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={(e) => { e.preventDefault(); prevSlide(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-primary text-white backdrop-blur-sm border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
                onClick={(e) => { e.preventDefault(); nextSlide(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-primary text-white backdrop-blur-sm border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 md:right-12 z-30 flex gap-2 sm:gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-500 shadow-sm",
                            currentSlide === idx ? "w-10 sm:w-12 bg-primary shadow-primary/50" : "w-3 bg-white/40 hover:bg-white/80"
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
