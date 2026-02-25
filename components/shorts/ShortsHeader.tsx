'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface ShortsHeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

export default function ShortsHeader({ searchQuery, onSearchChange }: ShortsHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-5xl font-extrabold flex items-center gap-3 mb-2"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
                        Shorts
                    </span>
                    <div className="p-1 px-2 rounded-md bg-red-600/20 border border-red-500/50 text-red-500 text-xs font-bold uppercase tracking-wider">
                        Beta
                    </div>
                </motion.h1>
                <p className="text-muted-foreground text-lg">
                    Swipe into the world of infinite entertainment.
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search trending shorts..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-secondary/30 backdrop-blur-md border border-white/10 rounded-full py-3 pl-11 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all shadow-sm"
                />
            </div>
        </div>
    );
}
