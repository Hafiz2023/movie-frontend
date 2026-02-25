'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ZoomIn, ImageIcon } from 'lucide-react';

interface ProfilePhotosTabProps {
    modelId: number;
    modelName: string;
    photoCount?: number;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function ProfilePhotosTab({
    modelId,
    modelName,
    photoCount = 8,
}: ProfilePhotosTabProps) {
    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Photo Gallery
                    <span className="text-xs font-semibold text-gray-500 bg-[#1a1a1a] px-2.5 py-1 rounded-full border border-[#2a2a2a]">
                        {photoCount}
                    </span>
                </h2>
            </div>

            {/* Photos Grid */}
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                variants={containerVariants}
            >
                {Array.from({ length: photoCount }).map((_, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="group relative aspect-[3/4] bg-[#111] rounded-xl overflow-hidden cursor-pointer border border-[#1a1a1a]"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Image
                            src={`https://picsum.photos/seed/${modelId}-${i}/600/800`}
                            alt={`${modelName} photo ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            unoptimized
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                            <motion.div
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full font-semibold text-sm border border-white/20"
                                initial={{ y: 10, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                            >
                                <ZoomIn className="w-4 h-4" />
                                View Full
                            </motion.div>
                        </div>

                        {/* Photo Number Badge */}
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/50 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border border-white/10">
                            {i + 1}/{photoCount}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
