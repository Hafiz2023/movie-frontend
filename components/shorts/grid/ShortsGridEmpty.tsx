'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ShortsGridEmptyProps {
    selectedCategory: string | null;
}

const ShortsGridEmpty: React.FC<ShortsGridEmptyProps> = ({ selectedCategory }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 text-center space-y-4 sm:space-y-6 px-4"
        >
            {/* Animated Icon */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="relative"
            >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                <div className="relative bg-gradient-to-br from-secondary/80 to-secondary/40 p-5 sm:p-8 rounded-full border border-white/10 backdrop-blur-sm">
                    <Search className="w-10 h-10 sm:w-14 sm:h-14 text-muted-foreground" />
                </div>
            </motion.div>

            {/* Message */}
            <div className="space-y-2 max-w-md">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    No shorts found
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {selectedCategory
                        ? `We couldn't find any shorts in "${selectedCategory}". Try a different category or clear your filters.`
                        : 'We couldn\'t find any shorts matching your search. Try something else or explore trending content.'}
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col xs:flex-row items-center gap-2 sm:gap-3 pt-2 w-full xs:w-auto">
                <Link href="/shorts">
                    <Button
                        variant="outline"
                        className="gap-2 border-white/10 hover:bg-secondary/50"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Clear Filters
                    </Button>
                </Link>
                <Link href="/">
                    <Button className="gap-2 bg-gradient-to-r from-primary to-orange-600 hover:opacity-90 shadow-lg shadow-primary/25">
                        <Sparkles className="w-4 h-4" />
                        Explore Trending
                    </Button>
                </Link>
            </div>

            {/* Decorative dots */}
            <div className="flex items-center gap-1.5 pt-4">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default ShortsGridEmpty;
