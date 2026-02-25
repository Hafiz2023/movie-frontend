'use client';

import React from 'react';
import VideoCard from '@/components/video/VideoCard';
import { MOCK_VIDEOS } from '@/utils/mockData';

export default function MoreVideosSection() {
    return (
        <div className="border-t border-white/10 pt-10 mt-10">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-primary rounded-full" />
                You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[...MOCK_VIDEOS, ...MOCK_VIDEOS].slice(0, 10).map((video, idx) => (
                    <VideoCard
                        key={`more-${video.id}-${idx}`}
                        video={{
                            ...video,
                            views: 5000 + (idx * 1234 % 50000)
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
