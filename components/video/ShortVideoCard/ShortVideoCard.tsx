'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Eye, ThumbsUp } from 'lucide-react';
import { ShortVideo } from '@/types';
import { cn } from '@/lib/utils';

interface ShortVideoCardProps {
    video: ShortVideo;
    className?: string;
}

const ShortVideoCard: React.FC<ShortVideoCardProps> = ({ video, className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={cn("group relative", className)}
        >
            <Link href={`/shorts/watch/${video.id}`} className="block relative h-full">
                <div
                    className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 aspect-[9/16] border border-white/10 group-hover:border-primary/50"
                >
                    {/* Thumbnail Image */}
                    <Image
                        src={video.thumbnail_url}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        unoptimized
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Play Button - Premium Look */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                        <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-xl flex items-center justify-center border border-primary/50 shadow-[0_0_30px_rgba(250,157,5,0.4)]">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </div>
                    </div>

                    {/* Side Stats */}
                    <div className="absolute right-3 bottom-24 flex flex-col gap-4 items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                        <div className="flex flex-col items-center gap-1">
                            <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-primary transition-colors border border-white/10">
                                <ThumbsUp className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-[11px] font-bold text-white drop-shadow-lg">
                                {video.likes > 1000 ? (video.likes / 1000).toFixed(1) + 'k' : video.likes}
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                                <Eye className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-[11px] font-bold text-white drop-shadow-lg">
                                {video.views > 1000 ? (video.views / 1000).toFixed(1) + 'k' : video.views}
                            </span>
                        </div>
                    </div>

                    {/* Content Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 pt-16 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-1 rounded-lg bg-primary/80 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-sm border border-white/10">
                                {video.category}
                            </span>
                        </div>

                        <h3 className="text-white font-extrabold text-sm sm:text-base line-clamp-2 leading-tight drop-shadow-xl group-hover:text-primary transition-colors duration-300">
                            {video.title}
                        </h3>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ShortVideoCard;
