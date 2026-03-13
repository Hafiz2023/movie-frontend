'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoCard from '@/components/video/VideoCard';
import { MOCK_VIDEOS } from '@/utils/mockData';

interface RecommendationsSidebarProps {
    currentVideoId: number;
}

export default function RecommendationsSidebar({ currentVideoId }: RecommendationsSidebarProps) {
    const recommendedVideos = MOCK_VIDEOS
        .filter(v => v.id !== currentVideoId)
        .slice(0, 10);

    return (
        <div className="w-full lg:w-[28%] space-y-4 sm:space-y-6">
            {/* Premium Promo Card */}
            <div className="relative w-full aspect-[5/3] sm:aspect-[4/3] rounded-xl overflow-hidden bg-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center p-4 sm:p-6 group cursor-pointer">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="z-10 bg-primary/10 p-2 sm:p-3 rounded-full mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary fill-primary animate-pulse" />
                </div>
                <h3 className="z-10 font-bold text-base sm:text-lg text-white mb-0.5 sm:mb-1">Get Premium Access</h3>
                <p className="z-10 text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">Ad-free 4K streaming & exclusive content.</p>
                <Button variant="premium" className="z-10 w-full rounded-full shadow-lg shadow-primary/20 text-xs sm:text-sm h-9 sm:h-10">Upgrade Now</Button>
            </div>

            {/* Up Next */}
            <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="font-bold text-base sm:text-lg text-white">Up Next</h3>
                    <div className="flex gap-2 text-xs">
                        <span className="text-primary font-bold cursor-pointer">Autoplay</span>
                        <div className="w-8 h-4 bg-primary/20 rounded-full relative cursor-pointer">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-primary rounded-full shadow-sm" />
                        </div>
                    </div>
                </div>

                {/* On mobile, show as horizontal scrollable row. On lg, show as vertical list */}
                <div className="flex lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-2 lg:pb-0">
                    {recommendedVideos.map((vid) => (
                        <div key={vid.id} className="min-w-[260px] sm:min-w-[280px] lg:min-w-0">
                            <VideoCard
                                video={vid}
                                variant="horizontal"
                                className="hover:bg-white/5 p-1.5 sm:p-2 rounded-lg transition-colors"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
