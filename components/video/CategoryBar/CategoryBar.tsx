'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

export interface CategoryItem {
    name: string;
    icon: LucideIcon;
    href: string;
}

interface CategoryBarProps {
    categories: CategoryItem[];
    activeCategory: string;
    onCategoryChange?: (name: string) => void;
    className?: string;
}

const CategoryBar: React.FC<CategoryBarProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
    className,
}) => {
    return (
        <div className={cn(
            "sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-y border-border py-3 supports-[backdrop-filter]:bg-background/60",
            className
        )}>
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.name;

                        return (
                            <Link
                                key={cat.name}
                                href={cat.href}
                                onClick={() => onCategoryChange?.(cat.name)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                                        : "bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-white border border-border/50"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {cat.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CategoryBar;
