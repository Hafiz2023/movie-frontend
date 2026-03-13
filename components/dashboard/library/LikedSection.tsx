import React from 'react';
import VideoCard from '@/components/video/VideoCard';
import { MOCK_VIDEOS } from '@/utils/mockData';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LikedSection() {
    const likedVideos = MOCK_VIDEOS.slice(2, 6);

    return (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 bg-card/20 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-pink-500/10 transition-colors duration-500" />
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500 border border-pink-500/20">
                        <Heart className="w-5 h-5 fill-pink-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Liked Videos</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Your personal collection of favorites.</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {likedVideos.map((video, idx) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        key={video.id}
                        className="hover:-translate-y-1 transition-transform duration-300"
                    >
                        <VideoCard video={video} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
