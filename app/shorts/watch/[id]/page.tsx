'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { MOCK_SHORTS } from '@/utils/mockData';
import { ArrowLeft, User, Heart, Share2, MoreHorizontal, MessageSquare, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ShortVideo } from '@/types';


export default function ShortWatchPage() {
    const { id } = useParams();
    const shortId = Number(id);
    const short = MOCK_SHORTS.find((s) => s.id === shortId);

    if (!short) {
        return notFound();
    }

    return (
        <div className="flex justify-center items-center h-screen w-full bg-black text-white overflow-hidden relative">
            {/* Background Blur Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img src={short.thumbnail_url} className="w-full h-full object-cover blur-3xl opacity-50" />
            </div>

            <div className="flex flex-col md:flex-row relative z-20 w-full h-full md:max-w-6xl md:h-[90vh] md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">

                {/* Video Player Section */}
                <div className="relative flex-1 bg-black h-full group">
                    {/* Back Button */}
                    <Link href="/shorts" className="absolute top-6 left-6 z-50 p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </Link>

                    <video
                        src={short.video_url}
                        controls
                        autoPlay
                        loop
                        className="w-full h-full object-contain bg-black"
                        poster={short.thumbnail_url}
                    >
                        Your browser does not support the video tag.
                    </video>

                    {/* Mobile & Overlay Controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />

                    {/* Right Side Actions (Mobile/Desktop Overlay) */}
                    <div className="absolute right-4 bottom-20 md:bottom-28 flex flex-col items-center gap-6 z-40">
                        <div className="flex flex-col items-center gap-1 group/btn">
                            <div className="p-3 bg-white/10 rounded-full backdrop-blur-md border border-white/5 hover:bg-primary/80 active:scale-90 transition-all cursor-pointer">
                                <Heart className="w-7 h-7 fill-white/20 group-hover/btn:fill-white transition-colors" />
                            </div>
                            <span className="text-xs font-bold drop-shadow-md">{short.likes}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="p-3 bg-white/10 rounded-full backdrop-blur-md border border-white/5 hover:bg-white/20 active:scale-90 transition-all cursor-pointer">
                                <MessageSquare className="w-7 h-7" />
                            </div>
                            <span className="text-xs font-bold drop-shadow-md">1.2k</span>
                        </div>
                        <div className="p-3 bg-white/10 rounded-full backdrop-blur-md border border-white/5 hover:bg-white/20 active:scale-90 transition-all cursor-pointer">
                            <Share2 className="w-7 h-7" />
                        </div>
                        <div className="p-3 bg-white/10 rounded-full backdrop-blur-md border border-white/5 hover:bg-white/20 active:scale-90 transition-all cursor-pointer">
                            <MoreHorizontal className="w-7 h-7" />
                        </div>
                    </div>

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-6 left-4 right-20 z-40 text-left">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary to-orange-500">
                                <Avatar className="w-10 h-10 border-2 border-black">
                                    <AvatarFallback className="bg-zinc-800 text-white font-bold">U</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm drop-shadow-lg has-[:hover]:underline cursor-pointer">
                                    @CreatorName
                                </h3>
                                <Button variant="ghost" size="sm" className="h-5 px-0 text-primary hover:text-primary/80 font-semibold text-xs uppercase tracking-wider">
                                    Subscribe
                                </Button>
                            </div>
                        </div>

                        <p className="text-sm font-medium line-clamp-2 drop-shadow-md mb-3 text-white/90">
                            {short.title} <span className="text-muted-foreground">#shorts #trending</span>
                        </p>

                        <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full w-fit border border-white/5">
                            <Music2 className="w-3 h-3 animate-pulse" />
                            <span>Original Sountrack - Artist Name</span>
                        </div>
                    </div>
                </div>

                {/* Desktop Comments Sidebar */}
                <div className="hidden md:flex flex-col w-[400px] bg-zinc-950 border-l border-white/5 h-full relative z-30">
                    <div className="p-5 border-b border-white/5 flex items-center justify-between bg-zinc-950/50 backdrop-blur-xl sticky top-0">
                        <h3 className="font-bold text-lg">Comments <span className="text-muted-foreground text-sm font-normal">(1.2k)</span></h3>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-6">
                        {/* Fake Comments */}
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex gap-4 group">
                                <Avatar className="w-9 h-9 border border-white/10">
                                    <AvatarFallback className="text-xs bg-zinc-800">U{i}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-zinc-200">User {i}</span>
                                            <span className="text-[10px] text-zinc-500">2h ago</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors">
                                        This is absolutely amazing! The cinematography is top-notch. Can't wait for part 2! 🔥
                                    </p>
                                    <div className="flex items-center gap-4 mt-1">
                                        <button className="text-xs font-semibold text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
                                            Reply
                                        </button>
                                        <button className="text-xs text-zinc-500 hover:text-red-500 flex items-center gap-1 group/like">
                                            <Heart className="w-3 h-3 group-hover/like:fill-red-500 transition-colors" /> 24
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Comment Input */}
                    <div className="p-4 border-t border-white/5 bg-zinc-950 sticky bottom-0">
                        <div className="relative flex items-center gap-3">
                            <Avatar className="w-8 h-8 opacity-50">
                                <AvatarFallback className="text-[10px] bg-zinc-800">ME</AvatarFallback>
                            </Avatar>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-full py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-white placeholder:text-zinc-600 transition-all focus:bg-zinc-900"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
