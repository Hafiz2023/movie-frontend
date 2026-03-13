'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_VIDEOS } from '@/utils/mockData';
import {
    VideoPlayer,
    VideoInfoHeader,
    VideoDescription,
    CommentsSection,
    RecommendationsSidebar,
    MoreVideosSection
} from '@/components/watch';
import PhotoSlider from '@/components/photos/PhotoSlider';

export default function WatchPage() {
    const { id } = useParams();
    const videoId = Number(id);
    const video = MOCK_VIDEOS.find(v => v.id === videoId) || MOCK_VIDEOS[0];
    const [isPlaying, setIsPlaying] = useState(false);

    // Mock images for the slider (simulating gallery)
    const galleryImages = [
        video.thumbnail_url,
        ...MOCK_VIDEOS.filter(v => v.id !== video.id).slice(0, 5).map(v => v.thumbnail_url)
    ];

    if (!video) return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Video not found</div>;

    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-[60vh] sm:h-[80vh] overflow-hidden -z-10 bg-black">
                <div
                    className="absolute inset-0 opacity-30 blur-[80px] sm:blur-[120px] scale-110"
                    style={{
                        backgroundImage: `url(${video.thumbnail_url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-background/80 to-background" />
            </div>

            <div className="max-w-[1800px] mx-auto w-full p-3 sm:p-4 md:p-6 lg:p-8 space-y-6 sm:space-y-8">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                    {/* Left Column: Video Player, Info, Comments */}
                    <div className="flex-1 w-full lg:w-[72%] space-y-4 sm:space-y-6">
                        <VideoPlayer
                            thumbnailUrl={video.thumbnail_url}
                            videoUrl={video.video_url}
                            duration={video.duration}
                            isPlaying={isPlaying}
                            onPlay={() => setIsPlaying(true)}
                        />

                        <VideoInfoHeader video={video} />

                        <VideoDescription
                            views={video.views}
                            date={video.date}
                            tags={video.tags}
                            description={video.description}
                        />

                        {/* Scene Gallery */}
                        <div className="pt-2 sm:pt-4">
                            <PhotoSlider images={galleryImages} title="Scene Gallery" />
                        </div>

                        <CommentsSection videoId={video.id} />
                    </div>

                    {/* Right Column: Recommendations */}
                    <RecommendationsSidebar currentVideoId={videoId} />
                </div>

                <MoreVideosSection />
            </div>
        </div>
    );
}
