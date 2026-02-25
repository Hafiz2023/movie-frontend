'use client';

import React from 'react';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

interface VideoInfoHeaderProps {
    video: {
        id: number;
        title: string;
        author?: string;
        author_avatar?: string;
        likes?: number | string;
    };
    isLiked: boolean;
    isDisliked: boolean;
    onLike: () => void;
    onDislike: () => void;
}

export default function VideoInfoHeader({ video, isLiked, isDisliked, onLike, onDislike }: VideoInfoHeaderProps) {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-white/95">
                {video.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-4 border-b border-border/40">
                {/* Channel Info */}
                <div className="flex items-center gap-4">
                    <Link href={`/models/${video.id}`} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-rose-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200" />
                        <Avatar className="relative w-12 h-12 border-2 border-background">
                            <AvatarImage src={video.author_avatar} alt={video.author} />
                            <AvatarFallback>{video.author?.[0]}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <div>
                        <Link href={`/models/${video.id}`} className="font-bold text-lg hover:text-primary transition-colors">
                            {video.author}
                        </Link>
                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                            1.2M subscribers •
                            <span className="text-primary cursor-pointer hover:underline">Join Premium</span>
                        </p>
                    </div>
                    <Button variant="premium" size="sm" className="ml-4 rounded-full">
                        Subscribe
                    </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                    <div className="flex items-center p-1 bg-secondary/50 rounded-full border border-white/5 backdrop-blur-sm">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`rounded-full px-4 gap-2 h-9 hover:bg-white/10 ${isLiked ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
                            onClick={onLike}
                        >
                            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            <span className="font-bold">{video.likes || '12K'}</span>
                        </Button>
                        <div className="w-[1px] h-4 bg-white/10 mx-1" />
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`rounded-full px-4 h-9 hover:bg-white/10 ${isDisliked ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
                            onClick={onDislike}
                        >
                            <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-current' : ''}`} />
                        </Button>
                    </div>

                    <Button variant="secondary" size="sm" className="rounded-full gap-2 h-11 px-6 bg-secondary/50 hover:bg-white/10 border border-white/5">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                    <Button variant="secondary" size="sm" className="rounded-full w-11 h-11 p-0 bg-secondary/50 hover:bg-white/10 border border-white/5">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
