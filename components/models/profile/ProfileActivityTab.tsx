'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import { Model } from '@/types';

interface ProfileActivityTabProps {
    model: Model;
}

interface ActivityItem {
    id: number;
    content: string;
    timeAgo: string;
    likes: string;
    comments: string;
}

const mockActivities: ActivityItem[] = [
    {
        id: 1,
        content: 'Just uploaded a new vlog from my trip to Bali! Check it out in the videos tab. 🌴☀️',
        timeAgo: '2 hours ago',
        likes: '1.2k',
        comments: '84',
    },
    {
        id: 2,
        content: 'Behind the scenes from today\'s photoshoot 📸 New content dropping this Friday! Stay tuned 🔥',
        timeAgo: '4 hours ago',
        likes: '2.8k',
        comments: '142',
    },
    {
        id: 3,
        content: 'Thank you for 1M subscribers! 🎉 As a thank you, I\'m releasing an exclusive video tonight for all my premium members. 💎',
        timeAgo: '6 hours ago',
        likes: '5.4k',
        comments: '321',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function ProfileActivityTab({ model }: ProfileActivityTabProps) {
    return (
        <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="space-y-5">
                {mockActivities.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="bg-[#0d0d0d] p-4 sm:p-5 rounded-xl border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors flex gap-3 sm:gap-4 group"
                    >
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gray-800 overflow-hidden relative ring-2 ring-[#1a1a1a] group-hover:ring-primary/20 transition-all">
                                <Image
                                    src={model.avatar}
                                    alt={model.name || 'Model'}
                                    fill
                                    className="object-cover"
                                    sizes="44px"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="font-bold text-white text-sm">{model.name}</span>
                                <span className="text-[11px] text-gray-600">• {item.timeAgo}</span>
                            </div>
                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                {item.content}
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-5 text-xs text-gray-500">
                                <motion.button
                                    className="flex items-center gap-1.5 hover:text-primary transition-colors group/btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Heart className="w-4 h-4 group-hover/btn:fill-primary/20" />
                                    {item.likes}
                                </motion.button>
                                <motion.button
                                    className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    {item.comments} Comments
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
