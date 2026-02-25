'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';

export interface PressRelease {
    date: string;
    title: string;
    excerpt: string;
    category?: string;
}

interface PressReleaseCardProps {
    release: PressRelease;
    index: number;
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export const PressReleaseCard: React.FC<PressReleaseCardProps> = ({ release, index }) => {
    return (
        <motion.article
            {...fadeInUp}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative p-6 md:p-8 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 cursor-pointer overflow-hidden"
        >
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                {/* Date & Category row */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary/60" />
                        <time>{release.date}</time>
                    </div>
                    {release.category && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {release.category}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3 flex items-start gap-2">
                    <span className="flex-1">{release.title}</span>
                    <ArrowUpRight className="w-5 h-5 mt-1 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-primary shrink-0" />
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground leading-relaxed">
                    {release.excerpt}
                </p>

                {/* Read more indicator */}
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Read Full Release
                    <div className="w-4 h-px bg-primary group-hover:w-8 transition-all duration-300" />
                </div>
            </div>
        </motion.article>
    );
};
