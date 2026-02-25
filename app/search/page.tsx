'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_VIDEOS } from '@/utils/mockData';
import { SearchHeader, SearchResultsGrid } from '@/components/search';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const filteredVideos = MOCK_VIDEOS.filter(video => {
        const lowerQuery = query.toLowerCase();
        return (
            video.title.toLowerCase().includes(lowerQuery) ||
            video.description?.toLowerCase().includes(lowerQuery) ||
            video.category.toLowerCase().includes(lowerQuery) ||
            video.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    });

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <SearchHeader query={query} resultCount={filteredVideos.length} />
            <div className="container mx-auto px-4 py-8">
                <SearchResultsGrid videos={filteredVideos} query={query} />
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-foreground">Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
