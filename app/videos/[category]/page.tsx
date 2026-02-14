'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { MOCK_VIDEOS } from '@/utils/mockData';
import VideoCard from '@/components/VideoCard';
import { ArrowLeft, Flame, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CategoryPage() {
    const params = useParams();
    // Decode the category from the URL (e.g. "Action%20Movies" -> "Action Movies")
    // Helper to decode and normalize category
    const categoryRaw = params?.category as string;
    const categoryName = categoryRaw ? decodeURIComponent(categoryRaw) : 'All';
    const normalizedCategory = categoryName.toLowerCase();

    // Logic to filter videos based on the category/filter type
    let displayVideos = MOCK_VIDEOS;

    if (normalizedCategory === 'all') {
        displayVideos = MOCK_VIDEOS;
    } else if (normalizedCategory === 'trending') {
        // Mock trending: videos with 'M' in views or generic subset
        displayVideos = MOCK_VIDEOS.filter((_, i) => i % 2 === 0);
    } else if (normalizedCategory === 'new') {
        // Mock new: reverse list
        displayVideos = [...MOCK_VIDEOS].reverse();
    } else if (normalizedCategory === 'top rated') {
        // Mock top rated: videos with high likes (containing 'K' or 'M')
        displayVideos = MOCK_VIDEOS.filter(v => v.likes?.includes('K') || v.likes?.includes('M'));
        // Fallback if filter is too strict for mock data
        if (displayVideos.length === 0) displayVideos = MOCK_VIDEOS.slice(0, 8);
    } else {
        // Standard category/tag filter
        displayVideos = MOCK_VIDEOS.filter(v => {
            const catMatch = v.category.toLowerCase().includes(normalizedCategory);
            const tagMatch = v.tags?.some(tag => tag.toLowerCase().includes(normalizedCategory));
            return catMatch || tagMatch;
        });
    }

    // Fallback: If no videos found for a category, show some related or random ones to avoid empty page
    if (displayVideos.length === 0) {
        // Try to match partial words
        displayVideos = MOCK_VIDEOS.filter(v =>
            v.title.toLowerCase().includes(normalizedCategory) ||
            v.description?.toLowerCase().includes(normalizedCategory)
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
            <div className="bg-background/95 border-b border-border sticky top-14 md:top-16 z-40 py-4 px-4 shadow-lg shadow-black/5">
                <div className="container mx-auto flex items-center gap-4">
                    <Link href="/videos">
                        <Button variant="ghost" size="icon" className="hover:bg-secondary rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground capitalize flex items-center gap-2">
                            {categoryName} <span className="text-primary">Videos</span>
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Browse the best {categoryName} content
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {displayVideos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6">
                        {displayVideos.map((video, idx) => (
                            <div key={`${video.id}-${idx}`} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
                                <VideoCard video={video} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="bg-secondary/50 p-6 rounded-full">
                            <AlertCircle className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold">No videos found for "{categoryName}"</h2>
                        <p className="text-muted-foreground max-w-md">
                            We couldn't find any videos in this category. Try exploring our other categories.
                        </p>
                        <Link href="/videos">
                            <Button className="mt-4">Back to All Videos</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

