'use client';

import React from 'react';
import Link from 'next/link';
import { Film, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-6 text-center bg-background px-4">
            <motion.div
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                <Ghost className="h-32 w-32 text-muted-foreground opacity-50 absolute blur-sm" />
                <Ghost className="h-32 w-32 text-primary relative z-10" />
            </motion.div>

            <div className="space-y-2">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl font-bold tracking-tight text-foreground"
                >
                    404
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl font-medium text-foreground"
                >
                    Video Not Found
                </motion.p>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-muted-foreground max-w-md mx-auto"
                >
                    The video you are looking for might have been deleted, or the link is broken.
                </motion.p>
            </div>


        </div>
    );
}
