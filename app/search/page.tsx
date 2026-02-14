'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_VIDEOS } from '@/utils/mockData';
import VideoCard from '@/components/VideoCard';
import { Search, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    // Filter videos based on search query
    // In a real app, this would be an API call
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
            {/* Header */}
            <div className="bg-background/95 border-b border-border sticky top-14 md:top-16 z-40 py-4 px-4 shadow-lg shadow-black/5">
                <div className="container mx-auto flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="hover:bg-secondary rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            Search Results for <span className="text-primary">"{query}"</span>
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Found {filteredVideos.length} videos matching your search
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {filteredVideos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6">
                        {filteredVideos.map((video, idx) => (
                            <div key={`${video.id}-${idx}`} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
                                <VideoCard video={video} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="bg-secondary/50 p-6 rounded-full">
                            <Search className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold">No videos found for "{query}"</h2>
                        <p className="text-muted-foreground max-w-md">
                            We couldn't find any videos matching your search terms. Try using different keywords or categories.
                        </p>
                        <Link href="/">
                            <Button className="mt-4">Back to Home</Button>
                        </Link>
                    </div>
                )}
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
