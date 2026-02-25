'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';

interface ProfileAboutTabProps {
    modelName: string;
    bio: string;
    interests: string[];
    stats: { [key: string]: string };
    onJoinFanClub?: () => void;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.1 },
    }),
};

export default function ProfileAboutTab({
    modelName,
    bio,
    interests,
    stats,
    onJoinFanClub,
}: ProfileAboutTabProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Bio & Interests */}
            <div className="md:col-span-2 space-y-5 sm:space-y-6">
                {/* Bio Card */}
                <motion.div
                    className="bg-[#0d0d0d] p-4 sm:p-6 rounded-xl border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                >
                    <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        About {modelName}
                    </h3>
                    <div className="text-gray-400 leading-relaxed whitespace-pre-line text-sm">
                        {bio}
                    </div>
                </motion.div>

                {/* Interests Card */}
                <motion.div
                    className="bg-[#0d0d0d] p-4 sm:p-6 rounded-xl border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                >
                    <h3 className="text-lg font-bold mb-4 text-white">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                        {interests.map((tag) => (
                            <motion.span
                                key={tag}
                                className="bg-[#1a1a1a] text-gray-300 px-4 py-1.5 rounded-full text-sm border border-[#2a2a2a] hover:border-primary/30 hover:text-primary cursor-pointer transition-colors"
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Right Column - Stats & Premium */}
            <div className="space-y-5 sm:space-y-6">
                {/* Stats Card */}
                <motion.div
                    className="bg-[#0d0d0d] p-4 sm:p-6 rounded-xl border border-[#1a1a1a]"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                >
                    <h3 className="text-lg font-bold mb-4 text-white border-b border-[#1a1a1a] pb-3">
                        Stats
                    </h3>
                    <div className="space-y-3.5 text-sm">
                        {Object.entries(stats).map(([label, value]) => (
                            <div key={label} className="flex justify-between items-center">
                                <span className="text-gray-500 capitalize">{label}</span>
                                <span className="text-white font-medium">{value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Premium Fan Club CTA */}
                <motion.div
                    className="relative overflow-hidden p-6 rounded-xl border border-primary/20"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-orange-600/10 to-rose-600/10" />

                    {/* Animated Glow */}
                    <motion.div
                        className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <div className="relative">
                        <div className="flex items-center gap-2 mb-2">
                            <Crown className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold text-primary">Premium Fan Club</h3>
                        </div>
                        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                            Get access to private Snapchat, exclusive 4K videos, custom content, and behind-the-scenes footage.
                        </p>
                        <motion.button
                            onClick={onJoinFanClub}
                            className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Join Now — $9.99/mo
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
