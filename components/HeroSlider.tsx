'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, TrendingUp, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_VIDEOS } from '@/utils/mockData';

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    // Take top 5 slides, or rotate random ones
    const featuredVideos = MOCK_VIDEOS.slice(0, 5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredVideos.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [featuredVideos.length]);

    const currentVideo = featuredVideos[currentIndex];

    // Preload next image for smoother transition
    useEffect(() => {
        const nextIndex = (currentIndex + 1) % featuredVideos.length;
        const img = new window.Image();
        img.src = featuredVideos[nextIndex].thumbnail_url;
    }, [currentIndex, featuredVideos]);

    return (
        <div className="relative w-full h-[60vh] md:h-[75vh] rounded-2xl overflow-hidden group mb-10 border border-white/5 shadow-2xl shadow-black/50">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={currentVideo.thumbnail_url}
                        alt={currentVideo.title}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                    {/* Cinematic Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-black/20" /> {/* General overlay for text contrast */}
                </motion.div>
            </AnimatePresence>

            {/* Content Content */}
            <div className="absolute bottom-0 left-0 p-4 sm:p-8 md:p-12 lg:p-16 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-3 sm:gap-5 z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3"
                >
                    <span className="px-2.5 py-1 rounded-full bg-primary/90 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_0_15px_rgba(225,29,72,0.4)] border border-white/10">
                        <TrendingUp className="w-3 h-3" /> #1 Trending
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/30 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md">
                        <Star className="w-3 h-3 fill-current" /> Premium
                    </span>
                </motion.div>

                <motion.h1
                    key={`title-${currentIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] drop-shadow-xl line-clamp-2"
                >
                    {currentVideo.title}
                </motion.h1>

                <motion.div
                    key={`meta-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/90 text-xs sm:text-sm font-medium"
                >
                    <span className="bg-white/10 px-2 py-0.5 rounded text-white border border-white/10">4K Ultra HD</span>
                    <span>{currentVideo.duration}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{currentVideo.views} views</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{currentVideo.likes} likes</span>
                </motion.div>

                <motion.p
                    key={`desc-${currentIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/70 line-clamp-2 md:line-clamp-3 text-sm sm:text-base md:text-lg font-medium drop-shadow-md max-w-xl"
                >
                    {currentVideo.description}
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto"
                >
                    <Link
                        href={`/watch/${currentVideo.id}`}
                        className="group relative flex items-center justify-center gap-2 sm:gap-3 bg-primary hover:bg-primary/90 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/30 overflow-hidden w-full sm:w-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] translate-x-[-200%] animate-[shine_3s_infinite]" />
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                        Watch Video
                    </Link>
                    <button className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                        Full Collection
                    </button>
                </motion.div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-8 md:right-8 flex gap-2 sm:gap-3 z-20">
                {featuredVideos.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 backdrop-blur-sm ${idx === currentIndex ? 'w-8 sm:w-10 bg-primary shadow-[0_0_15px_hsl(var(--primary))]' : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'}`}
                    />
                ))}
            </div>

            {/* Side Navigation for Desktop */}
            <div className="hidden md:flex absolute top-1/2 right-4 -translate-y-1/2 flex-col gap-4 z-20">
                {featuredVideos.map((vid, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-16 h-16 rounded-lg border-2 overflow-hidden cursor-pointer transition-all duration-300 relative ${idx === currentIndex ? 'border-primary scale-110 shadow-lg shadow-black/50' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'}`}
                    >
                        <Image src={vid.thumbnail_url} alt="" fill className="object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
}
