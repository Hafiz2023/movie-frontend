'use client';

import React from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
    thumbnailUrl: string;
    videoUrl?: string;
    duration: string;
    isPlaying: boolean;
    onPlay: () => void;
}

export default function VideoPlayer({ thumbnailUrl, videoUrl, duration, isPlaying, onPlay }: VideoPlayerProps) {
    return (
        <div className="relative aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group">
            {!isPlaying ? (
                <>
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${thumbnailUrl})` }} />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={onPlay}
                            className="group/btn relative flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-primary/90 text-white shadow-[0_0_20px_rgba(225,29,72,0.5)] sm:shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:scale-110 transition-all duration-300 backdrop-blur-sm active:scale-95"
                        >
                            <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 fill-current ml-0.5 sm:ml-1" />
                            <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-50" />
                        </button>
                    </div>
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 bg-black/80 backdrop-blur px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm font-bold text-white border border-white/10">
                        {duration}
                    </div>
                </>
            ) : (
                <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                >
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
}
