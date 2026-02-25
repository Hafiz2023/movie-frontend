'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LucideIcon, Film, Shield, Zap } from 'lucide-react';

interface AuthHeroPanelProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    backgroundImage: string;
    backgroundAlt?: string;
    features?: { icon: LucideIcon; text: string }[];
}

const defaultFeatures = [
    { icon: Film, text: 'Unlimited HD Streaming' },
    { icon: Shield, text: 'Secure & Private' },
    { icon: Zap, text: 'Instant Access' },
];

const floatingParticles = [
    { size: 3, x: '15%', y: '20%', delay: 0, duration: 6 },
    { size: 2, x: '80%', y: '30%', delay: 1, duration: 8 },
    { size: 4, x: '45%', y: '70%', delay: 2, duration: 7 },
    { size: 2, x: '70%', y: '80%', delay: 0.5, duration: 9 },
    { size: 3, x: '25%', y: '60%', delay: 1.5, duration: 5 },
    { size: 2, x: '60%', y: '15%', delay: 3, duration: 6 },
];

export default function AuthHeroPanel({
    icon: Icon,
    title,
    subtitle,
    backgroundImage,
    backgroundAlt = 'Auth Background',
    features = defaultFeatures,
}: AuthHeroPanelProps) {
    return (
        <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/30 via-black/60 to-black/90" />

            {/* Background Image */}
            <Image
                src={backgroundImage}
                alt={backgroundAlt}
                fill
                className="object-cover opacity-50"
                priority
            />

            {/* Floating Particles */}
            {floatingParticles.map((particle, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-primary/30 z-20"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: particle.x,
                        top: particle.y,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Content */}
            <div className="relative z-20 max-w-lg px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {/* Icon Badge */}
                    <motion.div
                        className="w-20 h-20 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.5)]"
                        animate={{
                            boxShadow: [
                                '0 0 30px rgba(220,38,38,0.4)',
                                '0 0 50px rgba(220,38,38,0.6)',
                                '0 0 30px rgba(220,38,38,0.4)',
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Icon className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                        {subtitle}
                    </p>

                    {/* Feature Badges */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        {features.map((feature, index) => {
                            const FeatureIcon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-gray-200"
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FeatureIcon className="h-4 w-4 text-primary" />
                                    {feature.text}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-15" />
        </div>
    );
}
