'use client';

import React from 'react';
import { Star } from 'lucide-react';
import VideoCard from '@/components/video/VideoCard';
import EmptyState from '@/components/ui/EmptyState';
import { MOCK_VIDEOS } from '@/utils/mockData';
import Sidebar from '@/components/layout/Sidebar';

export default function TopRatedPage() {
    // Simulate top rated by manually assigning a high view count based on an artificial 'rating'
    const topRatedVideos = [...MOCK_VIDEOS].sort((a, b) => b.id - a.id).slice(0, 20);

    return (
        <div className="flex min-h-screen bg-background text-foreground relative">
            <Sidebar />

            <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden pt-6 lg:ml-64">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col mb-8 p-6 bg-card/40 border border-white/5 rounded-3xl relative overflow-hidden backdrop-blur-md">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="flex items-center gap-4 relative">
                            <div className="bg-yellow-500/20 p-4 rounded-full">
                                <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white">Top Rated</h1>
                                <p className="text-muted-foreground mt-2 max-w-xl">
                                    The highest-rated master pieces as voted by the community. Discover the best content across all categories.
                                </p>
                            </div>
                        </div>
                    </div>

                    {topRatedVideos.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                            {topRatedVideos.map((video, idx) => (
                                <VideoCard
                                    key={`top-rated-${video.id}-${idx}`}
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
                            className="bg-card/30 rounded-3xl border border-white/5"
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
