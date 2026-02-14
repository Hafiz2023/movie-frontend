'use client';
import React, { useState } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function FeaturedVideo({ video }: FeaturedVideoProps) {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <div className="relative w-full aspect-[21/9] md:aspect-[24/9] max-h-[600px] overflow-hidden rounded-xl group">
            {/* Background - Either Image or Video */}
            <div className="absolute inset-0">
                <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />

                {/* Optional: Add video autoplay here if desired, kept simple with image for now for performance */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
            </div>

            {/* Content Content */}
            <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-primary/20 backdrop-blur-md border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                    Featured Premiere
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">
                    {video.title}
                </h1>

                <p className="text-white/80 line-clamp-2 md:line-clamp-3 text-sm md:text-lg font-medium drop-shadow-md">
                    {video.description}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 w-full sm:w-auto">
                    <Link
                        href={`/watch/${video.id}`}
                        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-bold text-base md:text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 min-w-[140px]"
                    >
                        <Play className="w-5 h-5 fill-current" />
                        Watch Now
                    </Link>

                    <button className="flex items-center justify-center gap-2 bg-secondary/60 hover:bg-secondary/80 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-lg font-semibold text-base transition-all hover:scale-105 active:scale-95 min-w-[140px]">
                        <Info className="w-5 h-5" />
                        More Info
                    </button>

                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="hidden sm:flex ml-auto md:ml-0 p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/10 transition-colors shrink-0"
                    >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>

                    {/* Mobile Only Volume Toggle - Positioned absolutely to top right or bottom right of container if preferred, or just in list */}
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="sm:hidden absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white border border-white/10"
                    >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
