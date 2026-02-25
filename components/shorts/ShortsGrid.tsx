'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ShortVideo } from '@/types';
import {
    ShortsGridTitle,
    ShortsGridLayout,
    ShortsGridEmpty,
    ShortsGridSkeleton,
    ShortsGridStats,
    ShortsGridToolbar,
} from './grid';
import type { LayoutMode } from './grid';

interface ShortsGridProps {
    shorts: ShortVideo[];
    selectedCategory: string | null;
    isLoading?: boolean;
    onClearCategory?: () => void;
}

export default function ShortsGrid({
    shorts,
    selectedCategory,
    isLoading = false,
    onClearCategory,
}: ShortsGridProps) {
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid');

    // Memoize the total count to avoid unnecessary re-renders
    const totalCount = useMemo(() => shorts.length, [shorts]);

    // Handle layout change
    const handleLayoutChange = useCallback((mode: LayoutMode) => {
        setLayoutMode(mode);
    }, []);

    // Show skeleton during loading
    if (isLoading) {
        return (
            <div className="relative z-10">
                <ShortsGridSkeleton count={12} />
            </div>
        );
    }

    return (
        <div className="relative z-10">
            {/* Section Title */}
            <ShortsGridTitle
                selectedCategory={selectedCategory}
                totalCount={totalCount}
            />

            {/* Stats Bar */}
            {shorts.length > 0 && (
                <ShortsGridStats
                    shorts={shorts}
                    selectedCategory={selectedCategory}
                    onClearCategory={onClearCategory}
                />
            )}

            {/* Layout Toolbar */}
            {shorts.length > 0 && (
                <ShortsGridToolbar
                    layoutMode={layoutMode}
                    onLayoutChange={handleLayoutChange}
                    totalCount={totalCount}
                />
            )}

            {/* Content Grid or Empty State */}
            {shorts.length > 0 ? (
                <ShortsGridLayout
                    shorts={shorts}
                    layoutMode={layoutMode}
                />
            ) : (
                <ShortsGridEmpty selectedCategory={selectedCategory} />
            )}
        </div>
    );
}
