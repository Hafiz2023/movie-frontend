'use client';

import React from 'react';
import { TrendingUp, Flame, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShortsCategoryBarProps {
    categories: string[];
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
}

export default function ShortsCategoryBar({ categories, selectedCategory, onCategoryChange }: ShortsCategoryBarProps) {
    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            <button
                onClick={() => onCategoryChange(null)}
                className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border",
                    !selectedCategory
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                        : "bg-secondary/30 text-muted-foreground border-transparent hover:bg-secondary/80 hover:text-foreground"
                )}
            >
                <TrendingUp className="w-4 h-4" />
                All
            </button>
            {categories.map((cat, idx) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border",
                        selectedCategory === cat
                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                            : "bg-secondary/30 text-muted-foreground border-transparent hover:bg-secondary/80 hover:text-foreground"
                    )}
                >
                    {idx % 2 === 0 ? <Flame className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                    {cat}
                </button>
            ))}
        </div>
    );
}
