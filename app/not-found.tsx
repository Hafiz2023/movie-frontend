'use client';

import React from 'react';
import Link from 'next/link';
import { Ghost } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4 text-center">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Ghost className="h-24 w-24 text-muted-foreground" />
            </motion.div>
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-foreground"
            >
                404 - Page Not Found
            </motion.h1>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-muted-foreground"
            >
                Whoops! Looks like you took a wrong turn at the cinema.
            </motion.p>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Link
                    href="/"
                    className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    Go back home
                </Link>
            </motion.div>
        </div>
    );
}
