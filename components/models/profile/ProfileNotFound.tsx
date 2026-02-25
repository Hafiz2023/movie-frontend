'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserX } from 'lucide-react';
import Link from 'next/link';

export default function ProfileNotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12 sm:p-6">
            <motion.div
                className="text-center max-w-md w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-[#111] rounded-full mx-auto mb-5 sm:mb-6 flex items-center justify-center border border-[#222]"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <UserX className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
                </motion.div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Model Not Found</h1>
                <p className="text-gray-400 mb-6 sm:mb-8 text-sm leading-relaxed px-4 sm:px-0">
                    The model you are looking for does not exist or may have been removed.
                </p>
                <Link
                    href="/models"
                    className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 sm:py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm active:scale-95"
                >
                    Browse All Models
                </Link>
            </motion.div>
        </div>
    );
}
