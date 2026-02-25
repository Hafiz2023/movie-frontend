'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const ContactHero = () => {
    return (
        <div className="relative pt-24 pb-12 text-center container mx-auto px-4 z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30 mb-6 tracking-wide uppercase">
                    Support
                </span>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                    Get in <span className="text-primary">Touch</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                </p>
            </motion.div>
        </div>
    );
};
