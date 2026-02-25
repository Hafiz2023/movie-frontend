'use client';
import React, { useState } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FeaturedVideoProps {
    video: {
        id: number;
        title: string;
        description: string;
        thumbnail_url: string;
        video_url?: string;
        duration: string;
    }
}

const FeaturedVideo = ({ video }: FeaturedVideoProps) => {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <div className="relative w-full aspect-[21/9] md:aspect-[24/9] max-h-[600px] overflow-hidden rounded-2xl group border border-white/10 shadow-2xl">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-[10000ms] group-hover:scale-110"
                    priority
                    unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-3/4 lg:w-3/5 flex flex-col gap-4 md:gap-6 z-10 transition-transform duration-500 group-hover:translate-y-[-10px]">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary text-xs font-black uppercase tracking-widest w-fit"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Featured Premiere
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black text-white leading-[1.1] drop-shadow-2xl line-clamp-2"
                >
                    {video.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/80 line-clamp-2 md:line-clamp-3 text-base md:text-xl font-medium drop-shadow-md max-w-2xl"
                >
                    {video.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6 w-full sm:w-auto"
                >
                    <Link
                        href={`/watch/${video.id}`}
                        className="flex items-center justify-center gap-3 bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.05] active:scale-[0.95] shadow-xl shadow-primary/30 min-w-[180px]"
                    >
                        <Play className="w-6 h-6 fill-current" />
                        Watch Now
                    </Link>

                    <button className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.05] active:scale-[0.95] min-w-[180px]">
                        <Info className="w-6 h-6" />
                        More Info
                    </button>

                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="hidden sm:flex p-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl text-white border border-white/10 transition-all hover:scale-110 active:scale-90 shadow-lg"
                    >
                        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                </motion.div>
            </div>

            {/* Mobile Only Volume Toggle */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                className="sm:hidden absolute top-6 right-6 p-3 rounded-full bg-black/40 text-white border border-white/10 backdrop-blur-lg"
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
        </div>
    );
};

export default FeaturedVideo;
