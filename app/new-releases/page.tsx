'use client';

/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "New releases" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */


import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import VideoCard from '@/components/video/VideoCard';
import EmptyState from '@/components/ui/EmptyState';
import { MOCK_VIDEOS } from '@/utils/mockData';
import Sidebar from '@/components/layout/Sidebar';

export default function NewReleasesPage() {
    // Sort array treating earlier items as 'newer' or just randomly shuffling/slicing
    const newReleases = [...MOCK_VIDEOS].reverse().slice(0, 24);

    return (
        <div className="flex min-h-screen bg-background text-foreground relative">
            <Sidebar />

            <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden pt-6 lg:ml-64">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col mb-8 p-6 bg-card/40 border border-t-primary/20 border-white/5 rounded-3xl relative overflow-hidden backdrop-blur-md">
                        <div className="absolute top-0 right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="flex items-center gap-4 relative">
                            <div className="bg-primary/20 p-4 rounded-full border border-primary/30">
                                <Calendar className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-white">
                                    New Releases
                                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                                </h1>
                                <p className="text-muted-foreground mt-2 max-w-xl text-sm">
                                    Fresh content hot off the press. Experience our newest premium videos updated daily.
                                </p>
                            </div>
                        </div>
                    </div>

                    {newReleases.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                            {newReleases.map((video, idx) => (
                                <VideoCard
                                    key={`new-release-${video.id}-${idx}`}
                                    video={{
                                        ...video,
                                        views: typeof video.views === 'number' ? video.views : 200 + (video.id * 10)
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No new releases today."
                            actionLabel="Browse Popular"
                            actionHref="/popular"
                            className="bg-card/30 rounded-3xl border border-white/5"
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
