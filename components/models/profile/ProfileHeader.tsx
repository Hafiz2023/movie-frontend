'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, UserPlus, MessageCircle, Share2, Eye, Film, Trophy } from 'lucide-react';
import { Model } from '@/types';

interface ProfileHeaderProps {
    model: Model;
    onSubscribe?: () => void;
    onMessage?: () => void;
    onShare?: () => void;
}

interface StatBadgeProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
}

function StatBadge({ icon, value, label }: StatBadgeProps) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            {icon}
            <div className="text-left">
                <p className="text-sm font-bold text-white leading-none">{value}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
            </div>
        </div>
    );
}

export default function ProfileHeader({
    model,
    onSubscribe,
    onMessage,
    onShare,
}: ProfileHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
            {/* Avatar */}
            <motion.div
                className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-black bg-gray-900 overflow-hidden shadow-2xl group cursor-pointer flex-shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                whileHover={{ scale: 1.05 }}
            >
                <Image
                    src={model.avatar}
                    alt={model.name}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity duration-300"
                    sizes="160px"
                />
                {/* Online Indicator */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black shadow-lg" />
            </motion.div>

            {/* Details */}
            <motion.div
                className="flex-1 text-center md:text-left mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
            >
                {/* Name Row */}
                <h1 className="text-2xl sm:text-3xl font-bold flex items-center justify-center md:justify-start gap-2 mb-2">
                    {model.name}
                    <CheckCircle2 className="w-6 h-6 text-blue-400 fill-blue-400/10" />
                </h1>

                {/* Stat Badges */}
                <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-4 sm:mb-5 flex-wrap">
                    <StatBadge
                        icon={<Eye className="w-3.5 h-3.5 text-primary" />}
                        value={model.views}
                        label="Views"
                    />
                    <StatBadge
                        icon={<Film className="w-3.5 h-3.5 text-blue-400" />}
                        value={model.videos}
                        label="Videos"
                    />
                    <StatBadge
                        icon={<Trophy className="w-3.5 h-3.5 text-yellow-400" />}
                        value={`#${model.rank}`}
                        label="Rank"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 justify-center md:justify-start flex-wrap">
                    <motion.button
                        onClick={onSubscribe}
                        className="flex items-center gap-2 bg-primary text-white font-bold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-sm sm:text-base active:scale-95"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <UserPlus className="w-4 h-4" />
                        Subscribe
                    </motion.button>
                    <motion.button
                        onClick={onMessage}
                        className="flex items-center gap-2 bg-[#1a1a1a] text-white font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-[#2a2a2a] transition-colors border border-[#333] text-sm sm:text-base active:scale-95"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle className="w-4 h-4" />
                        Message
                    </motion.button>
                    <motion.button
                        onClick={onShare}
                        className="p-2.5 bg-[#1a1a1a] text-white rounded-full hover:bg-[#2a2a2a] transition-colors border border-[#333]"
                        whileHover={{ scale: 1.1, y: -1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Share profile"
                    >
                        <Share2 className="w-4 h-4" />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
