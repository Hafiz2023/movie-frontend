import React from 'react';
import { cn } from '@/lib/utils'; // Assuming standard shadcn utils structure, if not defined I'll handle purely with template literals in mind, but classnames/clsx is standard.

interface ModelFilterProps {
    currentFilter: string;
    onFilterChange: (filter: string) => void;
}

export function ModelFilter({ currentFilter, onFilterChange }: ModelFilterProps) {
    const filters = [
        { id: 'trending', label: 'Trending' },
        { id: 'top-rated', label: 'Top Rated' },
        { id: 'newest', label: 'Newest' },
        { id: 'popular', label: 'Popular' }
    ];

    return (
        <div className="flex items-center p-1 bg-secondary/30 backdrop-blur-sm rounded-xl border border-white/5">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden
                        ${currentFilter === filter.id
                            ? 'text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                        }
                    `}
                >
                    {currentFilter === filter.id && (
                        <div className="absolute inset-0 bg-primary rounded-lg -z-10" />
                    )}
                    {filter.label}
                </button>
            ))}
        </div>
    );
}
