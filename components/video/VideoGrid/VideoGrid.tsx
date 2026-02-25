'use client';

import React from 'react';
import VideoCard from '@/components/video/VideoCard';
import { cn } from '@/lib/utils';

interface VideoData {
    id: number;
    title: string;
    thumbnail_url: string;
    video_url?: string;
    duration: string;
    views: string | number;
    likes?: number | string;
    rating?: number;
    date?: string;
    author?: string;
    author_avatar?: string;
    description?: string;
    category?: string;
    tags?: string[];
}

interface VideoGridProps {
    videos: VideoData[];
    columns?: string;
    className?: string;
    variant?: 'vertical' | 'horizontal';
}

const VideoGrid: React.FC<VideoGridProps> = ({
    videos,
    columns = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
    className,
    variant = 'vertical',
}) => {
    return (
        <div className={cn(
            "grid gap-y-10 gap-x-6",
            columns,
            className
        )}>
            {videos.map((video, idx) => (
                <div key={`${video.id}-${idx}`}>
                    <VideoCard video={video} variant={variant} />
                </div>
            ))}
        </div>
    );
};

export default VideoGrid;
