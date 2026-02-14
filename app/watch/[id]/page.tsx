'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_VIDEOS } from '@/utils/mockData';
import {
    Play,
    ThumbsUp,
    ThumbsDown,
    Share2,
    MoreHorizontal,
    Flag,
    User,
    MessageSquare,
    Heart,
    Eye,
    Calendar,
    ChevronDown
} from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PhotoSlider from '@/components/PhotoSlider';
import Link from 'next/link';

export default function WatchPage() {
    const { id } = useParams();
    const videoId = Number(id);
    const video = MOCK_VIDEOS.find(v => v.id === videoId) || MOCK_VIDEOS[0];
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showFullDesc, setShowFullDesc] = useState(false);

    // Mock images for the slider (simulating gallery)
    const galleryImages = [
        video.thumbnail_url,
        ...MOCK_VIDEOS.filter(v => v.id !== video.id).slice(0, 5).map(v => v.thumbnail_url)
    ];

    if (!video) return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Video not found</div>;

    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-[80vh] overflow-hidden -z-10 bg-black">
                <div
                    className="absolute inset-0 opacity-30 blur-[120px] scale-110"
                    style={{
                        backgroundImage: `url(${video.thumbnail_url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-background/80 to-background" />
            </div>

            <div className="max-w-[1800px] mx-auto w-full p-4 md:p-6 lg:p-8 space-y-8">

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Video Player, Info, Comments */}
                    <div className="flex-1 w-full lg:w-[72%] space-y-6">

                        {/* Video Player Container */}
                        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group">
                            {!isPlaying ? (
                                <>
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${video.thumbnail_url})` }} />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            onClick={() => setIsPlaying(true)}
                                            className="group/btn relative flex items-center justify-center w-24 h-24 rounded-full bg-primary/90 text-white shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <Play className="w-10 h-10 fill-current ml-1" />
                                            <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-50" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded-md text-sm font-bold text-white border border-white/10">
                                        {video.duration}
                                    </div>
                                </>
                            ) : (
                                <video
                                    src={video.video_url}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>

                        {/* Video Info Header */}
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
                                            onClick={() => { setIsLiked(!isLiked); setIsDisliked(false); }}
                                        >
                                            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                            <span className="font-bold">{video.likes || '12K'}</span>
                                        </Button>
                                        <div className="w-[1px] h-4 bg-white/10 mx-1" />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={`rounded-full px-4 h-9 hover:bg-white/10 ${isDisliked ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
                                            onClick={() => { setIsDisliked(!isDisliked); setIsLiked(false); }}
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

                        {/* Description & Stats */}
                        <div className="bg-secondary/30 rounded-2xl p-5 border border-white/5 backdrop-blur-md">
                            <div className="flex gap-4 font-semibold text-sm text-foreground/80 mb-3">
                                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-muted-foreground" /> {video.views} views</span>
                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-muted-foreground" /> {video.date}</span>
                                <div className="flex gap-2">
                                    {video.tags?.map(tag => (
                                        <span key={tag} className="text-primary hover:text-primary/80 cursor-pointer">#{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className={`relative overflow-hidden transition-all duration-300 ${showFullDesc ? 'max-h-96' : 'max-h-20'}`}>
                                <p className="text-foreground/90 leading-relaxed text-sm md:text-base">
                                    {video.description || "Experience the ultimate collection of premium scenes. Exclusive content only available here. Watch high-quality 4K videos updated daily."}
                                    <br /><br />
                                    This video features stunning cinematography and 4k resolution. Don't forget to like and subscribe for more content.
                                    Follow us on social media for daily updates and behind-the-scenes footage.
                                </p>
                                {!showFullDesc && (
                                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-secondary/50 to-transparent" />
                                )}
                            </div>
                            <button
                                onClick={() => setShowFullDesc(!showFullDesc)}
                                className="mt-2 text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                            >
                                {showFullDesc ? 'Show less' : 'Show more'}
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFullDesc ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* --- NEW PHOTO SLIDER SECTION --- */}
                        <div className="pt-4">
                            <PhotoSlider images={galleryImages} title="Scene Gallery" />
                        </div>

                        {/* Comments Section */}
                        <div className="pt-8">
                            <div className="flex items-center gap-3 mb-6">
                                <h3 className="text-xl font-bold">245 Comments</h3>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" className="text-foreground font-bold">Top</Button>
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Newest</Button>
                                </div>
                            </div>

                            <div className="flex gap-4 mb-8">
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-primary/20 text-primary font-bold">U</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Add a public comment..."
                                        className="w-full bg-transparent border-b border-border/40 focus:border-primary focus:outline-none pb-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="sm" className="rounded-full">Cancel</Button>
                                        <Button size="sm" className="rounded-full px-6 bg-secondary text-secondary-foreground hover:bg-primary hover:text-white transition-colors">Comment</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Comment Item */}
                            <div className="space-y-6">
                                <div className="flex gap-4 group">
                                    <Avatar className="w-10 h-10 border border-white/5">
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1.5 flex-1">
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="font-bold text-sm text-foreground">John Doe</span>
                                            <span className="text-muted-foreground">3 days ago</span>
                                        </div>
                                        <p className="text-sm text-foreground/80 leading-relaxed">
                                            This is hands down one of the best scenes I've watched recently. The quality is insane! 4K really makes a difference. Keeping coming with these uploads.
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                            <button className="flex items-center gap-1.5 hover:text-primary transition-colors group/like">
                                                <ThumbsUp className="w-3.5 h-3.5 group-hover/like:scale-110 transition-transform" />
                                                <span>42</span>
                                            </button>
                                            <button className="hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ThumbsDown className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="font-bold hover:text-white ml-2">Reply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Recommendations */}
                    <div className="w-full lg:w-[28%] space-y-6">

                        {/* Animated Ad Placeholder or Promo */}
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center p-6 group cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                            <div className="z-10 bg-primary/10 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                                <Heart className="w-8 h-8 text-primary fill-primary animate-pulse" />
                            </div>
                            <h3 className="z-10 font-bold text-lg text-white mb-1">Get Premium Access</h3>
                            <p className="z-10 text-xs text-muted-foreground mb-4">Ad-free 4K streaming & exclusive content.</p>
                            <Button variant="premium" className="z-10 w-full rounded-full shadow-lg shadow-primary/20">Upgrade Now</Button>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-white">Up Next</h3>
                                <div className="flex gap-2 text-xs">
                                    <span className="text-primary font-bold cursor-pointer">Autoplay</span>
                                    {/* Toggle switch visual */}
                                    <div className="w-8 h-4 bg-primary/20 rounded-full relative cursor-pointer">
                                        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-primary rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {MOCK_VIDEOS
                                    .filter(v => v.id !== videoId)
                                    .slice(0, 10)
                                    .map((vid, i) => (
                                        <VideoCard
                                            key={vid.id}
                                            video={vid}
                                            variant="horizontal"
                                            className="hover:bg-white/5 p-2 rounded-lg -mx-2 transition-colors"
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* More Videos Grid Section */}
                <div className="border-t border-white/10 pt-10 mt-10">
                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                        <span className="w-1 h-8 bg-primary rounded-full" />
                        You Might Also Like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[...MOCK_VIDEOS, ...MOCK_VIDEOS].slice(0, 10).map((video, idx) => (
                            <VideoCard
                                key={`more-${video.id}-${idx}`}
                                video={{
                                    ...video,
                                    views: 5000 + (idx * 1234 % 50000)
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
