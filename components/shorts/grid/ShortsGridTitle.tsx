'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, TrendingUp } from 'lucide-react';

interface ShortsGridTitleProps {
    selectedCategory: string | null;
    totalCount: number;
}

const ShortsGridTitle: React.FC<ShortsGridTitleProps> = ({ selectedCategory, totalCount }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between gap-3 mb-6"
        >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-lg shadow-primary/10 shrink-0">
                    {selectedCategory ? (
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    ) : (
                        <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    )}
                </div>
                <div className="min-w-0">
                    <h2 className="text-lg sm:text-2xl font-bold text-foreground tracking-tight truncate">
                        {selectedCategory ? `${selectedCategory} Shorts` : 'Trending Now'}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                        {selectedCategory
                            ? `Explore the best ${selectedCategory.toLowerCase()} content`
                            : 'Discover what\'s hot right now'}
                    </p>
                </div>
            </div>

            {/* Animated Count Badge */}
            <motion.div
                key={totalCount}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="hidden md:flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-secondary/40 backdrop-blur-sm border border-white/10 shrink-0"
            >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-muted-foreground">
                    {totalCount} {totalCount === 1 ? 'short' : 'shorts'}
                </span>
            </motion.div>
        </motion.div>
    );
};

export default ShortsGridTitle;
