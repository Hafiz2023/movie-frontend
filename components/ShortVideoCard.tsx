'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Eye, ThumbsUp } from 'lucide-react';
import { ShortVideo } from '../types';
import { cn, formatCurrency } from '@/lib/utils';

interface ShortVideoCardProps {
    video: ShortVideo;
    className?: string;
}

const ShortVideoCard: React.FC<ShortVideoCardProps> = ({ video, className }) => {
    return (
        <Link href={`/shorts/watch/${video.id}`} className={cn("block group relative", className)}>
            <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 aspect-[9/16] border border-white/5"
            >
                {/* Thumbnail Image */}
                <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Dark Gradient Overlay (Bottom-up) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Play Icon (Centered, appears on hover) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                </div>

                {/* Right Side Actions (Like TikTok/Reels) */}
                <div className="absolute right-2 bottom-20 flex flex-col gap-3 items-center opacity-90">
                    <div className="flex flex-col items-center gap-1">
                        <div className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-primary/80 transition-colors">
                            <ThumbsUp className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-bold text-white">{video.likes > 1000 ? (video.likes / 1000).toFixed(1) + 'k' : video.likes}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="p-2 rounded-full bg-black/40 backdrop-blur-sm">
                            <Eye className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-bold text-white">{video.views > 1000 ? (video.views / 1000).toFixed(1) + 'k' : video.views}</span>
                    </div>
                </div>

                {/* Bottom Content Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="flex items-center gap-2 mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="px-2.5 py-1 rounded-md bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-primary/20">
                            {video.category}
                        </span>
                    </div>

                    <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 leading-snug drop-shadow-md group-hover:text-primary transition-colors duration-300">
                        {video.title}
                    </h3>
                </div>
            </motion.div>
        </Link>
    );
};

export default ShortVideoCard;
