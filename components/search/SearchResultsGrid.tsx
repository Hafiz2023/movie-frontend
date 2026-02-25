'use client';

import React from 'react';
import VideoCard from '@/components/video/VideoCard';
import EmptyState from '@/components/ui/EmptyState';
import { MockVideo } from '@/types';

interface SearchResultsGridProps {
    videos: MockVideo[];
    query: string;
}

export default function SearchResultsGrid({ videos, query }: SearchResultsGridProps) {
    if (videos.length === 0) {
        return (
            <EmptyState
                title={`No videos found for "${query}"`}
                description="We couldn't find any videos matching your search terms. Try using different keywords or categories."
                actionLabel="Back to Home"
                actionHref="/"
            />
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6">
            {videos.map((video, idx) => (
                <div
                    key={`${video.id}-${idx}`}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${idx * 50}ms` }}
                >
                    <VideoCard video={video} />
                </div>
            ))}
        </div>
    );
}
