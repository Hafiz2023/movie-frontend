'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, TrendingUp, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_VIDEOS } from '@/utils/mockData';

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const featuredVideos = MOCK_VIDEOS.slice(0, 5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredVideos.length);
        }, 8000); // Slightly slower for better readability
        return () => clearInterval(timer);
    }, [featuredVideos.length]);

    const currentVideo = featuredVideos[currentIndex];

    // Preload next image
    useEffect(() => {
        const nextIndex = (currentIndex + 1) % featuredVideos.length;
        const img = new window.Image();
        img.src = featuredVideos[nextIndex].thumbnail_url;
    }, [currentIndex, featuredVideos]);

    return (
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[75vh] rounded-2xl sm:rounded-3xl overflow-hidden group mb-8 sm:mb-10 border border-white/5 shadow-2xl shadow-black/50">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
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
                    {/* Advanced Cinematic Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>
            </AnimatePresence>

            {/* Content Section */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-12 md:p-16 lg:p-20 w-full md:w-3/4 lg:w-3/5 flex flex-col gap-4 sm:gap-6 z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3"
                >
                    <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(250,157,5,0.4)] border border-white/10">
                        <TrendingUp className="w-3.5 h-3.5" /> #1 Trending
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary/80 text-foreground border border-white/10 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md">
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" /> Premium
                    </span>
                </motion.div>

                <motion.h1
                    key={`title-${currentIndex}`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1] drop-shadow-2xl line-clamp-2"
                >
                    {currentVideo.title}
                </motion.h1>

                <motion.div
                    key={`meta-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center gap-3 sm:gap-5 text-white/90 text-sm sm:text-base font-semibold"
                >
                    <span className="bg-primary/20 px-2.5 py-1 rounded text-primary border border-primary/30 text-xs">4K ULTRA HD</span>
                    <span>{currentVideo.duration}</span>
                    <span className="opacity-30">•</span>
                    <span>{(typeof currentVideo.views === 'number' ? currentVideo.views / 1000 : 0).toFixed(1)}K Views</span>
                </motion.div>

                <motion.p
                    key={`desc-${currentIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="text-white/80 line-clamp-2 md:line-clamp-3 text-base sm:text-lg md:text-xl font-medium drop-shadow-md max-w-2xl leading-relaxed"
                >
                    {currentVideo.description}
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-8 w-full sm:w-auto"
                >
                    <Link
                        href={`/watch/${currentVideo.id}`}
                        className="group relative flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-[1.05] active:scale-[0.98] shadow-xl shadow-primary/30 overflow-hidden w-full sm:w-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] translate-x-[-200%] group-hover:animate-[shine_1.5s_infinite]" />
                        <Play className="w-6 h-6 fill-current" />
                        Watch Now
                    </Link>
                    <button className="px-8 py-4 rounded-2xl font-bold text-lg border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white transition-all hover:scale-[1.05] active:scale-[0.98] w-full sm:w-auto">
                        View Details
                    </button>
                </motion.div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
                {featuredVideos.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-500 backdrop-blur-sm ${idx === currentIndex ? 'w-8 sm:w-12 bg-primary shadow-[0_0_20px_rgba(250,157,5,0.6)]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                    />
                ))}
            </div>

            {/* Side Previews */}
            <div className="hidden lg:flex absolute top-1/2 right-10 -translate-y-1/2 flex-col gap-5 z-20">
                {featuredVideos.map((vid, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-20 h-28 rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-500 relative ${idx === currentIndex ? 'border-primary ring-4 ring-primary/20 scale-110 shadow-2xl shadow-black' : 'border-white/10 opacity-40 hover:opacity-100 hover:scale-110'}`}
                    >
                        <Image src={vid.thumbnail_url} alt="" fill className="object-cover" />
                        {idx === currentIndex && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <Play className="w-6 h-6 text-white fill-white" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HeroSlider;
