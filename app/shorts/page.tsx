'use client';

import React, { useState } from 'react';
import { MOCK_SHORTS } from '@/utils/mockData';
import { ShortsHeader, ShortsCategoryBar, ShortsGrid } from '@/components/shorts';

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
                    <ShortsHeader
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />

                    {/* Category Pills */}
                    <ShortsCategoryBar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                </header>

                {/* Main Content Grid */}
                <ShortsGrid
                    shorts={filteredShorts}
                    selectedCategory={selectedCategory}
                    onClearCategory={() => setSelectedCategory(null)}
                />
            </div>
        </div>
    );
}
