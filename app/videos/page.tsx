'use client';
import React, { useState } from 'react';
import { MOCK_VIDEOS } from '@/utils/mockData';
import VideoCard from '@/components/video/VideoCard';
import HeroCarousel, { type HeroSlide } from '@/components/video/HeroCarousel';
import CategoryBar, { type CategoryItem } from '@/components/video/CategoryBar';
import { ChevronDown, Flame, Clock, Trophy, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Hero Slides ─────────────────────────────────────────
const HERO_SLIDES: HeroSlide[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2000&auto=format&fit=crop",
        title: "Intimate Connections",
        description: "Experience the heat of the moment with our exclusive couples collection.",
        tags: ["Romance", "Sensual", "HD"]
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
        title: "Passionate Encounters",
        description: "Dive into a world of unbridled passion and cinematic romance.",
        tags: ["Premium", "4K", "Exclusive"]
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2000&auto=format&fit=crop",
        title: "VIP After Hours",
        description: "Access the most exclusive parties and late-night adventures.",
        tags: ["Nightlife", "Glamour", "Live"]
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop",
        title: "Model Confidential",
        description: "Behind the scenes with the world's most stunning models.",
        tags: ["Backstage", "Photoshoot", "Beauty"]
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2000&auto=format&fit=crop",
        title: "Luxury Fantasies",
        description: "Escape to paradise with our premium lifestyle series.",
        tags: ["Luxury", "Exotic", "Relaxation"]
    }
];

// ─── Category Config ─────────────────────────────────────
const CATEGORIES: CategoryItem[] = [
    { name: "All", icon: Sparkles, href: "/videos" },
    { name: "Trending", icon: Flame, href: "/videos/Trending" },
    { name: "New", icon: Clock, href: "/videos/New" },
    { name: "Top Rated", icon: Trophy, href: "/videos/Top%20Rated" },
    { name: "Amateur", icon: Star, href: "/videos/Amateur" },
    { name: "Milf", icon: Star, href: "/videos/Milf" },
    { name: "Teen", icon: Star, href: "/videos/Teen" },
    { name: "Hentai", icon: Star, href: "/videos/Hentai" },
    { name: "Asian", icon: Star, href: "/videos/Asian" },
    { name: "Ebony", icon: Star, href: "/videos/Ebony" },
    { name: "Latina", icon: Star, href: "/videos/Latina" },
    { name: "Lesbian", icon: Star, href: "/videos/Lesbian" },
    { name: "VR", icon: Star, href: "/videos/VR" },
    { name: "Threesome", icon: Star, href: "/videos/Threesome" },
    { name: "BDSM", icon: Star, href: "/videos/BDSM" },
    { name: "Group", icon: Star, href: "/videos/Group" },
];

export default function VideosPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* 1. Featured Hero Carousel */}
            <div className="container mx-auto px-4 pt-6 mb-8">
                <HeroCarousel slides={HERO_SLIDES} />
            </div>

            {/* 2. Sticky Category Bar */}
            <CategoryBar
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                className="mb-6"
            />

            {/* 3. Main Content Grid */}
            <div className="container mx-auto px-4">
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            {activeCategory === "All" ? "Recommended for You" : `${activeCategory} Videos`}
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            Fresh content updated daily for your entertainment.
                        </p>
                    </div>
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

                {/* Load More */}
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
