'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Quote } from 'lucide-react';

interface CoverageItem {
    outlet: string;
    quote: string;
    url: string;
    logo: string; // Initials as fallback
}

const mediaCoverage: CoverageItem[] = [
    {
        outlet: 'TechCrunch',
        quote: '"MovieApp is redefining how we consume entertainment with its innovative creator-first approach."',
        url: '#',
        logo: 'TC',
    },
    {
        outlet: 'The Verge',
        quote: '"A bold new streaming platform that puts quality and creator empowerment at the forefront."',
        url: '#',
        logo: 'TV',
    },
    {
        outlet: 'Wired',
        quote: '"MovieApp\'s AI-powered recommendations set a new industry standard for content discovery."',
        url: '#',
        logo: 'WR',
    },
    {
        outlet: 'Forbes',
        quote: '"One of the fastest-growing entertainment platforms we\'ve seen this decade."',
        url: '#',
        logo: 'FB',
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export const MediaCoverage = () => {
    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-card/50 to-transparent">
            <div className="container mx-auto px-4">
                <motion.div {...fadeInUp} className="text-center mb-14">
                    <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 block">
                        In The News
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        Media Coverage
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {mediaCoverage.map((item, index) => (
                        <motion.a
                            key={item.outlet}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...fadeInUp}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative p-6 md:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 block"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                {/* Outlet header */}
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-sm font-black text-primary">
                                            {item.logo}
                                        </div>
                                        <span className="font-bold text-foreground text-lg">
                                            {item.outlet}
                                        </span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>

                                {/* Quote */}
                                <div className="relative">
                                    <Quote className="w-5 h-5 text-primary/30 mb-2" />
                                    <p className="text-muted-foreground leading-relaxed italic">
                                        {item.quote}
                                    </p>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};
