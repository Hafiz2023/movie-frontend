'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ZoomIn, Share2 } from 'lucide-react';
import Image from 'next/image';
import { Photo } from '@/types';
import useInteractionStore from '@/store/interactionStore';

interface PhotoCardProps {
    photo: Photo;
    index: number;
    onClick: (photo: Photo) => void;
}

export function PhotoCard({ photo, index, onClick }: PhotoCardProps) {
    const { togglePhotoLike, getPhotoInteraction } = useInteractionStore();
    const interaction = getPhotoInteraction(photo.id);

    const displayLikes = interaction.likeCount || photo.likes;

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        togglePhotoLike(photo.id, photo.likes);
    };

    return (
        <motion.div
            layoutId={`photo-${photo.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
            className="relative group break-inside-avoid rounded-xl sm:rounded-2xl overflow-hidden bg-muted mb-3 sm:mb-4 cursor-zoom-in"
            onClick={() => onClick(photo)}
        >
            {/* Main Image with Zoom Effect */}
            <div className="relative w-full overflow-hidden">
                <Image
                    src={photo.src}
                    alt={photo.title}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
            </div>

            {/* Top Badge: 4K/Premium */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="bg-black/60 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md border border-white/10 uppercase tracking-widest">
                    4K Ultra HD
                </span>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                {/* User Info */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold ring-2 ring-black">
                            {photo.user[0]}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-white drop-shadow-md">@{photo.user}</span>
                    </div>

                    <h3 className="font-bold text-white text-sm sm:text-lg leading-tight mb-2 sm:mb-3 line-clamp-2">{photo.title}</h3>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-2 sm:pt-3">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium transition-colors group/btn ${interaction.isLiked ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
                            >
                                <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${interaction.isLiked ? 'fill-current' : 'group-hover/btn:fill-current'}`} />
                                <span>{displayLikes}</span>
                            </button>
                            <button className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium text-gray-300 hover:text-blue-400 transition-colors">
                                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span>{photo.comments}</span>
                            </button>
                        </div>

                        <div className="flex gap-1.5 sm:gap-2">
                            <button className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/30 rounded-full backdrop-blur-md transition-all text-white">
                                <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </button>
                            <button className="p-1.5 sm:p-2 bg-white/10 hover:bg-primary rounded-full backdrop-blur-md transition-all text-white">
                                <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
