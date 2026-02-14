
import React from 'react';

interface MobileFiltersProps {
    filter: string;
    setFilter: (filter: string) => void;
}

export default function MobileFilters({ filter, setFilter }: MobileFiltersProps) {
    return (
        <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['Trending', 'Newest', 'Top Rated'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${filter === tab
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-muted-foreground border-border'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
