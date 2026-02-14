
import React from 'react';
import VideoCard from '@/components/VideoCard';
import { MOCK_VIDEOS } from '@/utils/mockData';

export default function LibraryTab() {
    const historyVideos = MOCK_VIDEOS.slice(0, 4);
    const likedVideos = MOCK_VIDEOS.slice(2, 6);

    return (
        <div className="space-y-8">
            <section>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Continue Watching</h2>
                        <p className="text-sm text-muted-foreground">Pick up where you left off.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {historyVideos.map((video) => (
                        <div key={video.id} className="relative group">
                            <VideoCard video={video} />
                            <div className="absolute bottom-[88px] left-0 right-0 h-1 bg-background/50 mx-3 rounded-full overflow-hidden z-10">
                                <div className="h-full bg-primary w-[45%]" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Liked Videos</h2>
                        <p className="text-sm text-muted-foreground">Your collection of favorites.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {likedVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </section>
        </div>
    );
}

