'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

interface ProfileCoverBannerProps {
    onChangeCover?: () => void;
}

export default function ProfileCoverBanner({ onChangeCover }: ProfileCoverBannerProps) {
    return (
        <div className="h-40 sm:h-48 md:h-72 relative group overflow-hidden">
            {/* Animated Gradient Background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800/90 to-black"
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />

            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />

            {/* Glowing Accent Line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
                style={{
                    background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)',
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Change Cover Button */}
            <motion.button
                onClick={onChangeCover}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-black/60 hover:bg-black/80 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Change Cover
            </motion.button>
        </div>
    );
}
