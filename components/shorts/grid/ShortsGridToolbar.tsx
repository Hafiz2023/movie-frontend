'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Rows3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type LayoutMode = 'grid' | 'compact';

interface ShortsGridToolbarProps {
    layoutMode: LayoutMode;
    onLayoutChange: (mode: LayoutMode) => void;
    totalCount: number;
}

const layoutOptions: { mode: LayoutMode; icon: React.ElementType; label: string }[] = [
    { mode: 'grid', icon: LayoutGrid, label: 'Grid' },
    { mode: 'compact', icon: Rows3, label: 'Compact' },
];

const ShortsGridToolbar: React.FC<ShortsGridToolbarProps> = ({
    layoutMode,
    onLayoutChange,
    totalCount,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between mb-4"
        >
            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{totalCount}</span> results
            </p>

            {/* Layout Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/30 border border-white/5 backdrop-blur-sm">
                {layoutOptions.map(({ mode, icon: Icon, label }) => (
                    <button
                        key={mode}
                        onClick={() => onLayoutChange(mode)}
                        className={cn(
                            'relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                            layoutMode === mode
                                ? 'text-white'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                        aria-label={`Switch to ${label} layout`}
                    >
                        {layoutMode === mode && (
                            <motion.div
                                layoutId="layout-toggle-active"
                                className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/25"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{label}</span>
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export default ShortsGridToolbar;
