'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_SHORTS, MOCK_VIDEOS } from '@/utils/mockData';
import CategoryFolder from '@/components/CategoryFolder';
import { LayoutGrid, List, Filter } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesPage() {
    // Extract all unique categories from both Shorts and Videos
    const allCategories = Array.from(new Set([
        ...MOCK_SHORTS.map(v => v.category),
        ...MOCK_VIDEOS.map(v => v.category || 'Uncategorized')
    ])).sort();

    return (
        <div className="flex flex-col gap-8 min-h-screen pb-20 max-w-[1600px] mx-auto p-4 md:p-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">All Categories</h1>
                <p className="text-muted-foreground">Browse our entire collection by genre and topic.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {allCategories.map((category, index) => {
                    // Find a thumbnail for this category
                    const video = MOCK_VIDEOS.find(v => v.category === category) || MOCK_SHORTS.find(v => v.category === category);
                    const count = MOCK_VIDEOS.filter(v => v.category === category).length + MOCK_SHORTS.filter(v => v.category === category).length;

                    return (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link href={`/categories/${category}`}>
                                <div className="group cursor-pointer">
                                    <CategoryFolder
                                        category={category}
                                        count={count}
                                        thumbnailUrl={video?.thumbnail_url || ''}
                                        onClick={() => { }} // Navigation handled by Link
                                        isSelected={false}
                                    />
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
