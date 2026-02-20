'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Photo } from '@/types';
import { LightboxImage } from './lightbox/LightboxImage';
import { LightboxSidebar } from './lightbox/LightboxSidebar';

interface PhotoLightboxProps {
    photo: Photo | null;
    onClose: () => void;
}

export function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
    if (!photo) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
                onClick={onClose}
            >
                <div
                    className="relative max-w-6xl w-full h-full md:h-[85vh] flex flex-col md:flex-row bg-background/5 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button - Mobile */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 md:hidden bg-black/50 text-white p-2 rounded-full backdrop-blur-md"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Left Side: Image Container */}
                    <LightboxImage photo={photo} />

                    {/* Right Side: Details Panel */}
                    <LightboxSidebar photo={photo} onClose={onClose} />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
