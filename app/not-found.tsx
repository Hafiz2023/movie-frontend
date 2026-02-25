'use client';

import React from 'react';
import Link from 'next/link';
import { Ghost, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
                    className="text-7xl font-black tracking-tight bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent"
                >
                    404
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl font-medium text-foreground"
                >
                    Page Not Found
                </motion.p>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-muted-foreground max-w-md mx-auto"
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </motion.p>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mt-4"
            >
                <Button onClick={() => window.history.back()} variant="outline" size="lg" className="min-w-40 gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </Button>
                <Link href="/">
                    <Button size="lg" className="min-w-40 gap-2 font-bold">
                        <Home className="w-4 h-4" />
                        Go Home
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
