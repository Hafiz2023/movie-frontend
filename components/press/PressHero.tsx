'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export const PressHero = () => {
    return (
        <section className="relative py-24 md:py-36 overflow-hidden">
            {/* Layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.08] via-primary/5 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

            {/* Animated floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.4,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
                    {/* Animated badge */}
                    <motion.div
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full mb-8 backdrop-blur-sm"
                        whileHover={{ scale: 1.05, borderColor: 'hsl(346, 87%, 43%, 0.4)' }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Newspaper className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary tracking-wide">
                            Press & Media
                        </span>
                    </motion.div>

                    {/* Title with gradient */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
                        <span className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent">
                            Press
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-primary via-rose-500 to-primary bg-clip-text text-transparent">
                            Center
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Stay updated with the latest news, press releases, and media
                        resources from MovieApp.
                    </p>

                    {/* Decorative line */}
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-10 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    />
                </motion.div>
            </div>
        </section>
    );
};
