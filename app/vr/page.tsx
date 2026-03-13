'use client';

/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "Vr" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */


import React from 'react';
import { Headset, PlayCircle } from 'lucide-react';
import VideoCard from '@/components/video/VideoCard';
import { MOCK_VIDEOS } from '@/utils/mockData';

export default function VRPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-20 overflow-x-hidden">
            {/* Immersive VR Header */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] flex items-center justify-center -mt-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        className="w-full h-full object-cover opacity-30 mix-blend-screen"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        {/* A generic tech/vr simulation placeholder video or image. We'll use background gradient + image as fallback */}
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 z-0"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=1920')` }}
                    />
                </div>

                <div className="relative z-20 container mx-auto px-4 text-center mt-20">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/40 mb-6 shadow-[0_0_30px_rgba(225,29,72,0.4)]">
                        <Headset className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
                        Dive Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Virtual Reality</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-medium">
                        Experience the ultimate immersion with our exclusive 180° & 360° 4K VR scenes. Put on your headset and enter a new world.
                    </p>
                    <button className="bg-primary hover:bg-white hover:text-primary text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center gap-3 mx-auto">
                        <PlayCircle className="w-6 h-6" /> Start VR Experience
                    </button>
                </div>
            </div>

            {/* Grid Content */}
            <div className="container mx-auto px-4 py-12 relative z-30">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(225,29,72,0.8)]" />
                        Latest VR Uploads
                    </h2>
                    <select className="bg-secondary/80 text-white rounded-lg px-4 py-2 border border-white/10 outline-none focus:border-primary transition-colors cursor-pointer text-sm font-bold">
                        <option>Newest First</option>
                        <option>Top Rated</option>
                        <option>Most Viewed</option>
                        <option>Longest</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {/* Re-use mock videos to simulate VR catalog */}
                    {MOCK_VIDEOS.map((video, idx) => (
                        <div key={`vr-${video.id}`} className="relative group">
                            {/* VR Badge Override over normal VideoCard */}
                            <div className="absolute top-2 left-2 z-20 pointer-events-none">
                                <span className="bg-primary/90 backdrop-blur text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-lg flex items-center gap-1">
                                    <Headset className="w-3 h-3" /> VR
                                </span>
                            </div>
                            <VideoCard
                                video={{
                                    ...video,
                                    views: 1000 + (idx * 153 % 50000)
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
