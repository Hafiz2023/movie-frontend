'use client';

import React from 'react';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import useInteractionStore from '@/store/interactionStore';

interface VideoInfoHeaderProps {
    video: {
        id: number;
        title: string;
        author?: string;
        author_avatar?: string;
        likes?: number | string;
    };
}

export default function VideoInfoHeader({ video }: VideoInfoHeaderProps) {
    const { toggleVideoLike, toggleVideoDislike, getVideoInteraction } = useInteractionStore();
    const interaction = getVideoInteraction(video.id);

    const defaultLikeCount = typeof video.likes === 'string'
        ? parseInt(video.likes.replace(/[^0-9]/g, '')) || 0
        : (video.likes || 0);

    const displayLikes = interaction.likeCount || defaultLikeCount;

    const handleLike = () => toggleVideoLike(video.id, defaultLikeCount);
    const handleDislike = () => toggleVideoDislike(video.id, defaultLikeCount);

    return (
        <div className="space-y-3 sm:space-y-4">
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-white/95">
                {video.title}
            </h1>

            <div className="flex flex-col gap-4 sm:gap-6 py-3 sm:py-4 border-b border-border/40">
                {/* Channel Info */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <Link href={`/models/${video.id}`} className="relative group shrink-0">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-rose-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200" />
                        <Avatar className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-background">
                            <AvatarImage src={video.author_avatar} alt={video.author} />
                            <AvatarFallback className="text-xs sm:text-sm">{video.author?.[0]}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <div className="min-w-0 flex-1">
                        <Link href={`/models/${video.id}`} className="font-bold text-sm sm:text-base md:text-lg hover:text-primary transition-colors truncate block">
                            {video.author}
                        </Link>
                        <p className="text-[10px] sm:text-xs text-muted-foreground font-medium flex items-center gap-1">
                            1.2M subscribers •
                            <span className="text-primary cursor-pointer hover:underline">Join Premium</span>
                        </p>
                    </div>
                    <Button variant="premium" size="sm" className="ml-auto rounded-full text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 shrink-0">
                        Subscribe
                    </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
                    <div className="flex items-center p-0.5 sm:p-1 bg-secondary/50 rounded-full border border-white/5 backdrop-blur-sm shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`rounded-full px-2.5 sm:px-4 gap-1 sm:gap-2 h-8 sm:h-9 text-xs sm:text-sm hover:bg-white/10 ${interaction.isLiked ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
                            onClick={handleLike}
                        >
                            <ThumbsUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${interaction.isLiked ? 'fill-current' : ''}`} />
                            <span className="font-bold">{displayLikes > 999 ? `${(displayLikes / 1000).toFixed(1)}K` : displayLikes}</span>
                        </Button>
                        <div className="w-[1px] h-3 sm:h-4 bg-white/10 mx-0.5 sm:mx-1" />
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`rounded-full px-2.5 sm:px-4 h-8 sm:h-9 hover:bg-white/10 ${interaction.isDisliked ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
                            onClick={handleDislike}
                        >
                            <ThumbsDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${interaction.isDisliked ? 'fill-current' : ''}`} />
                        </Button>
                    </div>

                    <Button variant="secondary" size="sm" className="rounded-full gap-1 sm:gap-2 h-8 sm:h-9 md:h-11 px-3 sm:px-4 md:px-6 text-xs sm:text-sm bg-secondary/50 hover:bg-white/10 border border-white/5 shrink-0">
                        <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Share</span>
                    </Button>
                    <Button variant="secondary" size="sm" className="rounded-full gap-1 sm:gap-2 h-8 sm:h-9 md:h-11 px-3 sm:px-4 md:px-6 text-xs sm:text-sm bg-secondary/50 hover:bg-white/10 border border-white/5 shrink-0">
                        <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Save</span>
                    </Button>
                    <Button variant="secondary" size="sm" className="rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 p-0 bg-secondary/50 hover:bg-white/10 border border-white/5 shrink-0">
                        <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
