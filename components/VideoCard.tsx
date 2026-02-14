import React, { useState, useRef, useEffect } from 'react';
import {  Play, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoCardProps {
    video: {
        id: number;
        title: string;
        thumbnail_url: string;
        video_url?: string;
        duration: string;
        views: string | number;
        likes?: number | string;
        rating?: number;
        date?: string;
        author?: string;
        author_avatar?: string;
    };
    className?: string;
    variant?: 'vertical' | 'horizontal';
}

export default function VideoCard({ video, className, variant = 'vertical' }: VideoCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isHighDef = video.id % 3 !== 0;

    // Handle hover video play
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isHovered && videoRef.current && video.video_url) {
            // Add a small delay before playing to prevent flickering on quick mouse movements
            timeout = setTimeout(() => {
                videoRef.current?.play().catch(() => { });
            }, 500);
        } else if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }

        return () => clearTimeout(timeout);
    }, [isHovered, video.video_url]);

    return (
        <div
            className={cn(
                "group relative flex flex-col gap-2 cursor-pointer", // Removed Link wrapper to handle interactions better
                variant === 'horizontal' && "flex-row gap-4",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/watch/${video.id}`} className="absolute inset-0 z-10" />

            {/* Thumbnail / Video Container */}
            <div className={cn(
                "relative bg-muted overflow-hidden rounded-xl aspect-video w-full transition-all duration-300",
                isHovered && "ring-2 ring-primary/50 shadow-lg shadow-primary/10",
                variant === 'horizontal' && "w-40 sm:w-60 "
            )}>
                {/* Main Image */}
                <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    fill
                    className={cn(
                        "object-cover transition-opacity duration-300",
                        isHovered && video.video_url ? "opacity-0" : "opacity-100"
                    )}
                    unoptimized
                />

                {/* Video Preview */}
                {video.video_url && (
                    <video
                        ref={videoRef}
                        src={video.video_url}
                        muted
                        loop
                        playsInline
                        className={cn(
                            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                            isHovered ? "opacity-100" : "opacity-0"
                        )}
                    />
                )}

                {/* Overlays */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-background/50 backdrop-blur-sm p-3 rounded-full border border-border/20 transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 text-foreground fill-foreground" />
                    </div>
                </div>

                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end pointer-events-none">
                    {isHighDef && (
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold border border-white/10 uppercase tracking-wider">
                            HD 4K
                        </span>
                    )}
                </div>

                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs text-white font-medium tracking-tight shadow-sm pointer-events-none">
                    {video.duration}
                </div>
            </div>

            {/* Info Section */}
            <div className="flex gap-3 px-1">
                {variant !== 'horizontal' && (
                    <Link href={`/author/${video.author}`} onClick={(e) => e.stopPropagation()} className="relative z-20">
                        <Avatar className="w-9 h-9 border border-border/10 mt-0.5  hover:border-primary transition-colors cursor-pointer">
                            <AvatarImage src={video.author_avatar} alt={video.author} />
                            <AvatarFallback>{video.author?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                    </Link>
                )}

                <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <h3 className={cn(
                        "font-semibold leading-tight text-foreground/90 group-hover:text-primary transition-colors text-base line-clamp-2",
                    )}>
                        {video.title}
                    </h3>

                    <div className="flex flex-col gap-0.5 text-xs text-muted-foreground/80">
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/author/${video.author}`}
                                className="hover:text-foreground transition-colors truncate relative z-20"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {video.author}
                            </Link>

                            {/* Verification tick could go here */}
                        </div>

                        <div className="flex items-center gap-1">
                            <span>{typeof video.views === 'number' ? `${(video.views / 1000).toFixed(1)}K` : video.views} views</span>
                            <span className="text-muted-foreground/40">•</span>
                            <span>{video.date || "Just now"}</span>
                        </div>
                    </div>
                </div>

                {/* Menu / Options - only show on hover for cleanup */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-0 md:static md:opacity-0 md:group-hover:opacity-100">
                    <button
                        className="p-1 hover:bg-muted rounded-full text-foreground"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Implementation for menu options
                        }}
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

