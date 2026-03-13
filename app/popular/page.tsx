'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import VideoCard from '@/components/video/VideoCard';
import EmptyState from '@/components/ui/EmptyState';
import { MOCK_VIDEOS } from '@/utils/mockData';
import Sidebar from '@/components/layout/Sidebar';

export default function PopularPage() {
    const sortedPopularVideos = [...MOCK_VIDEOS].sort((a, b) => {
        const viewsA = typeof a.views === 'number' ? a.views : (10000 + (a.id * 5432 % 500000));
        const viewsB = typeof b.views === 'number' ? b.views : (10000 + (b.id * 5432 % 500000));
        return viewsB - viewsA;
    });

    return (
        <div className="flex min-h-screen bg-background text-foreground relative">
            <Sidebar />

            <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden lg:ml-64">
                <div className="max-w-[1800px] mx-auto pt-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-primary/20 p-3 rounded-full">
                            <TrendingUp className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-white">Most Popular</h1>
                            <p className="text-muted-foreground mt-1">The most viewed and highly rated content on our platform.</p>
                        </div>
                    </div>

                    {sortedPopularVideos.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                            {sortedPopularVideos.map((video, idx) => (
                                <VideoCard
                                    key={`popular-${video.id}-${idx}`}
                                    video={{
                                        ...video,
                                        views: typeof video.views === 'number' ? video.views : 10000 + (video.id * 5432 % 500000)
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No top videos currently found."
                            actionLabel="Return Home"
                            actionHref="/"
                            className="bg-card/30 rounded-3xl"
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
