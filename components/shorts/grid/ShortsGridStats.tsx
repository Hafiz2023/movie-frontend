'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, Filter, X } from 'lucide-react';
import { ShortVideo } from '@/types';

interface ShortsGridStatsProps {
    shorts: ShortVideo[];
    selectedCategory: string | null;
    onClearCategory?: () => void;
}

const ShortsGridStats: React.FC<ShortsGridStatsProps> = ({
    shorts,
    selectedCategory,
    onClearCategory,
}) => {
    const totalViews = shorts.reduce((sum, s) => sum + s.views, 0);
    const totalLikes = shorts.reduce((sum, s) => sum + s.likes, 0);

    const formatNumber = (num: number): string => {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
        return num.toString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5"
        >
            {/* Stats Chips */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/30 border border-white/5 text-xs text-muted-foreground">
                <Eye className="w-3.5 h-3.5" />
                <span className="font-medium">{formatNumber(totalViews)} views</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/30 border border-white/5 text-xs text-muted-foreground">
                <Heart className="w-3.5 h-3.5 text-red-400" />
                <span className="font-medium">{formatNumber(totalLikes)} likes</span>
            </div>

            {/* Active Filter Badge */}
            <AnimatePresence>
                {selectedCategory && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        onClick={onClearCategory}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs text-primary hover:bg-primary/20 transition-colors cursor-pointer group"
                    >
                        <Filter className="w-3.5 h-3.5" />
                        <span className="font-semibold">{selectedCategory}</span>
                        <X className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ShortsGridStats;
