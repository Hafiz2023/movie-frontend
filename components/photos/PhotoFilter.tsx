'use client';
import React from 'react';
import { Filter } from 'lucide-react';

interface PhotoFilterProps {
    currentFilter: string;
    setFilter: (filter: string) => void;
}

export function PhotoFilter({ currentFilter, setFilter }: PhotoFilterProps) {
    const tabs = ['Trending', 'Newest', 'Top Rated', 'Exclusive'];

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="hidden md:flex items-center gap-2 text-muted-foreground mr-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Sort by:</span>
            </div>
            <div className="flex bg-secondary p-1 rounded-xl">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`
                            px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap
                            ${currentFilter === tab
                                ? 'bg-background text-primary shadow-sm ring-1 ring-border'
                                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                            }
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}
