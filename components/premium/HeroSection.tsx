'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
    return (
        <div className="relative pt-20 pb-12 text-center container mx-auto px-4 z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-500 text-xs font-bold border border-yellow-500/30 mb-6 tracking-wide uppercase">
                    Upgrade Your Experience
                </span>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                    Unlock the <span className="text-primary">Ultimate</span> Collection
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Join thousands of members enjoying exclusive 4K content, ad-free streaming, and private access to top creators.
                </p>
            </motion.div>
        </div>
    );
};
