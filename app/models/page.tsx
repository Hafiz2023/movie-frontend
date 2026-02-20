'use client';
import React, { useState } from 'react';
import { MOCK_MODELS } from '@/utils/mockData';
import { ModelFilter } from '@/components/models/ModelFilter';
import { ModelGrid } from '@/components/models/ModelGrid';

export default function ModelsPage() {
    const [filter, setFilter] = useState('trending');

    // Filter logic can be implemented here based on the `filter` state.
    // Currently, we're displaying all models for demonstration purposes.
    const filteredModels = MOCK_MODELS;

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header / Sticky Filter Bar */}
            <div className="sticky top-14 md:top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm transition-all duration-300">
                <div className="container mx-auto py-4 md:py-6 px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1 md:mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Top Creators</h1>
                            <p className="text-muted-foreground font-medium text-sm md:text-base">Discover the most popular talents ranked by community engagement.</p>
                        </div>

                        <div className="self-start md:self-center w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            <ModelFilter currentFilter={filter} onFilterChange={setFilter} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-primary rounded-full" />
                        Featured Models
                    </h2>
                </div>

                <ModelGrid models={filteredModels} />
            </div>
        </div>
    );
}
