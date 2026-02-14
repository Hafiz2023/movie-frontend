'use client';
import React, { useState } from 'react';
import { MOCK_VIDEOS } from '@/utils/mockData';
import VideoCard from '@/components/VideoCard';
import { Filter, ChevronDown, Flame, Clock, Trophy, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
    { name: "All", icon: Sparkles },
    { name: "Trending", icon: Flame },
    { name: "New", icon: Clock },
    { name: "Top Rated", icon: Trophy },
    { name: "Amateur", icon: Star },
    { name: "Milf", icon: Star },
    { name: "Teen", icon: Star },
    { name: "Hentai", icon: Star },
    { name: "Asian", icon: Star },
    { name: "Ebony", icon: Star },
    { name: "Latina", icon: Star },
    { name: "Lesbian", icon: Star },
    { name: "VR", icon: Star },
    { name: "Threesome", icon: Star },
    { name: "BDSM", icon: Star },
    { name: "Group", icon: Star },
];

// Safe, cinematic, premium images used instead of explicit content
const HERO_SLIDES = [
    {
        id: 1,
        // Couple intimate silhouette/sunset - Romantic & Safe
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2000&auto=format&fit=crop",
        title: "Intimate Connections",
        description: "Experience the heat of the moment with our exclusive couples collection.",
        tags: ["Romance", "Sensual", "HD"]
    },
    {
        id: 2,
        // Woman in red dress, mysterious/glamorous
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
        title: "Passionate Encounters",
        description: "Dive into a world of unbridled passion and cinematic romance.",
        tags: ["Premium", "4K", "Exclusive"]
    },
    {
        id: 3,
        // Night club/party vibe 
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2000&auto=format&fit=crop",
        title: "VIP After Hours",
        description: "Access the most exclusive parties and late-night adventures.",
        tags: ["Nightlife", "Glamour", "Live"]
    },
    {
        id: 4,
        // Model/Fashion shoot, edgy
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop",
        title: "Model Confidential",
        description: "Behind the scenes with the world's most stunning models.",
        tags: ["Backstage", "Photoshoot", "Beauty"]
    },
    {
        id: 5,
        // Luxurious bedroom/boudoir setting
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2000&auto=format&fit=crop",
        title: "Luxury Fantasies",
        description: "Escape to paradise with our premium lifestyle series.",
        tags: ["Luxury", "Exotic", "Relaxation"]
    }
];

export default function VideosPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide effect -- Slower interval (7s)
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    // Simulate loading
    const loadMore = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* 1. Featured Section / Hero Slider */}
            <div className="container mx-auto px-4 pt-6 mb-8">
                <div className="relative w-full aspect-[4/5] md:aspect-[24/9] max-h-[600px] overflow-hidden rounded-xl group bg-black shadow-2xl shadow-primary/10 border border-white/5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {/* Background Image with Parallax-like effect */}
                            <div className="absolute inset-0">
                                <motion.img
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 10, ease: "easeOut" }}
                                    src={HERO_SLIDES[currentSlide].image}
                                    alt={HERO_SLIDES[currentSlide].title}
                                    className="w-full h-full object-cover"
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
                                    {HERO_SLIDES[currentSlide].tags.map(tag => (
                                        <div key={tag} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider w-fit shadow-lg shadow-primary/10">
                                            {tag}
                                        </div>
                                    ))}
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-2xl"
                                >
                                    {HERO_SLIDES[currentSlide].title}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="text-white/90 line-clamp-2 md:line-clamp-3 text-sm sm:text-base md:text-lg font-medium drop-shadow-md max-w-xl"
                                >
                                    {HERO_SLIDES[currentSlide].description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 w-full sm:w-auto"
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

                    {/* Navigation Arrows (Big & Bold) */}
                    <button
                        onClick={(e) => { e.preventDefault(); prevSlide(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-primary text-white backdrop-blur-sm border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); nextSlide(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-primary text-white backdrop-blur-sm border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Dots Indicators (Premium Style) */}
                    <div className="absolute bottom-6 right-6 md:right-12 z-30 flex gap-3">
                        {HERO_SLIDES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-500 shadow-sm",
                                    currentSlide === idx ? "w-12 bg-primary shadow-primary/50" : "w-3 bg-white/40 hover:bg-white/80"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Sticky Category Bar */}
            <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-y border-border py-3 mb-6 supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            // For "All", link to the main page, others link to sub-pages
                            const href = cat.name === "All" ? "/videos" : `/videos/${encodeURIComponent(cat.name)}`;
                            const isActive = activeCategory === cat.name;

                            return (
                                <Link
                                    key={cat.name}
                                    href={href}
                                    onClick={() => setActiveCategory(cat.name)} // Optional visual update, though navigation will reset state usually
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                                            : "bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-white border border-border/50"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 3. Main Content Grid */}
            <div className="container mx-auto px-4">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            {activeCategory === "All" ? "Recommended for You" : `${activeCategory} Videos`}
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            Fresh content updated daily for your entertainment.
                        </p>
                    </div>

                    {/* View Options (Hidden on mobile for space) */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                            View All
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6">
                    {MOCK_VIDEOS.map((video, idx) => (
                        <div key={`${video.id}-${idx}`}>
                            <VideoCard video={video} />
                        </div>
                    ))}
                    {/* Repeat mock data to simulate more content */}
                    {MOCK_VIDEOS.map((video, idx) => (
                        <div key={`d1-${video.id}-${idx}`}>
                            <VideoCard video={{ ...video, id: video.id + 100 }} />
                        </div>
                    ))}
                    {MOCK_VIDEOS.map((video, idx) => (
                        <div key={`d2-${video.id}-${idx}`}>
                            <VideoCard video={{ ...video, id: video.id + 200 }} />
                        </div>
                    ))}
                </div>

                {/* Load More Trigger */}
                <div className="flex justify-center mt-16">
                    <Button
                        onClick={loadMore}
                        disabled={isLoading}
                        variant="outline"
                        className="min-w-[200px] border-border bg-secondary/50 hover:bg-secondary text-foreground"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                Loading...
                            </div>
                        ) : (
                            "Load More Videos"
                        )}
                    </Button>
                </div>
            </div>

        </div>
    );
}
