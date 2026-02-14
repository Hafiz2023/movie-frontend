'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ShortVideoCard from '@/components/ShortVideoCard';
import { MOCK_SHORTS } from '@/utils/mockData';
import { Play, TrendingUp, Grid, Search, Zap, Flame, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ShortsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Get unique categories
    const categories = Array.from(new Set(MOCK_SHORTS.map((video) => video.category)));

    const filteredShorts = MOCK_SHORTS.filter((video) => {
        const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? video.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 py-8 max-w-[1800px]">
                {/* Header Section */}
                <header className="mb-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-5xl font-extrabold flex items-center gap-3 mb-2"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
                                    Shorts
                                </span>
                                <div className="p-1 px-2 rounded-md bg-red-600/20 border border-red-500/50 text-red-500 text-xs font-bold uppercase tracking-wider">
                                    Beta
                                </div>
                            </motion.h1>
                            <p className="text-muted-foreground text-lg">
                                Swipe into the world of infinite entertainment.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search trending shorts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-secondary/30 backdrop-blur-md border border-white/10 rounded-full py-3 pl-11 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Category Pills Scroller */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border",
                                !selectedCategory
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                                    : "bg-secondary/30 text-muted-foreground border-transparent hover:bg-secondary/80 hover:text-foreground"
                            )}
                        >
                            <TrendingUp className="w-4 h-4" />
                            All
                        </button>
                        {categories.map((cat, idx) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border",
                                    selectedCategory === cat
                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                                        : "bg-secondary/30 text-muted-foreground border-transparent hover:bg-secondary/80 hover:text-foreground"
                                )}
                            >
                                {idx % 2 === 0 ? <Flame className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                                {cat}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Main Content Grid */}
                <div className="relative z-10">

                    {/* Section Title */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-full bg-primary/10">
                            <Compass className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">
                            {selectedCategory ? `${selectedCategory} Shorts` : 'Trending Now'}
                        </h2>
                    </div>

                    {/* Highly Responsive Grid */}
                    {filteredShorts.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6"
                        >
                            {filteredShorts.map((video, index) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <ShortVideoCard video={video} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
                                <Search className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">No shorts found</h3>
                            <p className="text-muted-foreground max-w-sm">
                                We couldn't find any shorts matches "{searchQuery}". Try searching for something else.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
