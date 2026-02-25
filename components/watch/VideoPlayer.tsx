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
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group">
            {!isPlaying ? (
                <>
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${thumbnailUrl})` }} />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={onPlay}
                            className="group/btn relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/90 text-white shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:scale-110 transition-all duration-300 backdrop-blur-sm active:scale-95"
                        >
                            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                            <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-50" />
                        </button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded-md text-sm font-bold text-white border border-white/10">
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
