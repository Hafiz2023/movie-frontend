'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import VideoCard from '@/components/video/VideoCard';
import { MockVideo } from '@/types';

interface ProfileVideosTabProps {
    videos: MockVideo[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProfileVideosTab({ videos }: ProfileVideosTabProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <Film className="w-5 h-5 text-primary" />
                    Latest Videos
                    <span className="text-xs font-semibold text-gray-500 bg-[#1a1a1a] px-2.5 py-1 rounded-full border border-[#2a2a2a]">
                        {videos.length}
                    </span>
                </h2>
            </div>

            {/* Videos Grid */}
            {videos.length > 0 ? (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                >
                    {videos.map((video) => (
                        <motion.div key={video.id} variants={itemVariants}>
                            <VideoCard video={video} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    className="py-20 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Film className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">No videos found for this model yet.</p>
                </motion.div>
            )}
        </motion.div>
    );
}
