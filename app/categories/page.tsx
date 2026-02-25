'use client';

import React from 'react';
import { MOCK_SHORTS, MOCK_VIDEOS } from '@/utils/mockData';
import { CategoriesHeader, CategoriesGrid } from '@/components/categories';

export default function CategoriesPage() {
    // Extract all unique categories from both Shorts and Videos
    const allCategories = Array.from(new Set([
        ...MOCK_SHORTS.map(v => v.category),
        ...MOCK_VIDEOS.map(v => v.category || 'Uncategorized')
    ])).sort();

    // Build category data with counts and thumbnails
    const categoryData = allCategories.map(category => {
        const video = MOCK_VIDEOS.find(v => v.category === category) || MOCK_SHORTS.find(v => v.category === category);
        const count = MOCK_VIDEOS.filter(v => v.category === category).length + MOCK_SHORTS.filter(v => v.category === category).length;
        return {
            name: category,
            count,
            thumbnailUrl: video?.thumbnail_url || ''
        };
    });

    return (
        <div className="flex flex-col gap-8 min-h-screen pb-20 max-w-[1600px] mx-auto p-4 md:p-8">
            <CategoriesHeader
                title="All Categories"
                subtitle="Browse our entire collection by genre and topic."
            />
            <CategoriesGrid categories={categoryData} />
        </div>
    );
}
