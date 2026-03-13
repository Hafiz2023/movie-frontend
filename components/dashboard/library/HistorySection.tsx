import React from 'react';
import VideoCard from '@/components/video/VideoCard';
import { MOCK_VIDEOS } from '@/utils/mockData';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HistorySection() {
    const historyVideos = MOCK_VIDEOS.slice(0, 4);

    return (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-card/20 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Continue Watching</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Pick up exactly where you left off.</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {historyVideos.map((video, idx) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        key={video.id}
                        className="relative group/vid hover:-translate-y-1 transition-transform duration-300"
                    >
                        <VideoCard video={video} />
                        <div className="absolute bottom-[88px] left-0 right-0 h-1.5 bg-background/80 backdrop-blur-sm mx-3 rounded-full overflow-hidden z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                            <div className="h-full bg-primary/80 w-[45%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.8)] relative">
                                <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/50 blur-[1px]" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
