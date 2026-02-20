'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import { Photo } from '@/types';

interface LightboxImageProps {
    photo: Photo;
}

export function LightboxImage({ photo }: LightboxImageProps) {
    return (
        <motion.div
            layoutId={`photo-${photo.id}`}
            className="flex-1 relative bg-black flex items-center justify-center p-4 md:p-8 group overflow-hidden md:rounded-l-3xl rounded-t-3xl md:rounded-tr-none"
        >
            {/* Background blurred version for ambience */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
                <Image
                    src={photo.src}
                    alt=""
                    fill
                    className="object-cover blur-3xl scale-150"
                />
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
                <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-contain"
                    quality={100}
                    priority
                />
            </div>

            {/* Image Controls Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <button className="text-white/80 hover:text-white transition-colors" title="Zoom">
                    <Share2 className="w-5 h-5" />
                </button>
                <div className="w-px h-4 bg-white/20" />
                <button className="text-white/80 hover:text-white transition-colors" title="Download">
                    <Download className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
}
