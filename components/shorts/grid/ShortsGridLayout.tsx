'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShortVideoCard from '@/components/video/ShortVideoCard/ShortVideoCard';
import { ShortVideo } from '@/types';

type LayoutMode = 'grid' | 'compact';

interface ShortsGridLayoutProps {
    shorts: ShortVideo[];
    layoutMode: LayoutMode;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.03,
            staggerDirection: -1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring' as const,
            stiffness: 260,
            damping: 20,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: { duration: 0.2 },
    },
};

const gridClasses: Record<LayoutMode, string> = {
    grid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6',
    compact: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-3',
};

const ShortsGridLayout: React.FC<ShortsGridLayoutProps> = ({ shorts, layoutMode }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={layoutMode}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={gridClasses[layoutMode]}
            >
                <AnimatePresence>
                    {shorts.map((video) => (
                        <motion.div
                            key={video.id}
                            variants={itemVariants}
                            layout
                            layoutId={`short-card-${video.id}`}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                            <ShortVideoCard video={video} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
};

export default ShortsGridLayout;
