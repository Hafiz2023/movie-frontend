'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoSliderProps {
    images: string[];
    title?: string;
}

export default function PhotoSlider({ images, title = "Scene Previews" }: PhotoSliderProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev! + 1) % images.length);
        }
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
        }
    };

    return (
        <div className="w-full space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white/90">
                {title} <span className="text-xs font-normal text-muted-foreground ml-2">({images.length} images)</span>
            </h3>

            {/* Scrollable Row of Images */}
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar snap-x">
                {images.map((img, idx) => (
                    <motion.div
                        key={idx}
                        className="relative h-40 md:h-52 aspect-[16/9] min-w-[280px] md:min-w-[350px] rounded-xl overflow-hidden cursor-pointer group border border-white/5 bg-secondary snap-center"
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openLightbox(idx)}
                    >
                        <Image
                            src={img}
                            alt={`Scene ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-primary/80 rounded-full text-white transition-all z-50 hidden md:block group"
                        >
                            <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-primary/80 rounded-full text-white transition-all z-50 hidden md:block group"
                        >
                            <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Main Image */}
                        <div className="relative w-full max-w-7xl aspect-video rounded-lg overflow-hidden shadow-2xl shadow-black">
                            <motion.div
                                key={lightboxIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="w-full h-full"
                            >
                                <Image
                                    src={images[lightboxIndex]}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </motion.div>

                            {/* Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-4 py-1 rounded-full text-white text-sm font-medium">
                                {lightboxIndex + 1} / {images.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
