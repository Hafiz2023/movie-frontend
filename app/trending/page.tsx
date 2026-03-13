'use client';

/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "Trending" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */


import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { TrendingUp } from 'lucide-react';
import { MOCK_VIDEOS } from '@/utils/mockData';
import VideoCard from '@/components/video/VideoCard';

export default function TrendingPage() {
    const trendingVideos = MOCK_VIDEOS.slice(0, 10).map((v) => ({ ...v, trending: true }));

    return (
        <div className="flex min-h-screen bg-background text-foreground relative">
            <Sidebar />
            <main className="flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden pt-4 sm:pt-6 lg:ml-64">
                <div className="max-w-[1800px] mx-auto space-y-8">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Trending Videos</h1>
                    </div>
                    <p className="text-muted-foreground mb-8">
                        The most popular content watched by users in the last 24 hours.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                        {trendingVideos.map((video, idx) => (
                            <VideoCard
                                key={`${video.id}-trending-${idx}`}
                                video={{
                                    ...video,
                                    views: typeof video.views === 'number' ? video.views + 500000 : 500000
                                }}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
