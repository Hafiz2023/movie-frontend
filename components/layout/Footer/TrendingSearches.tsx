'use client';

import React from 'react';
import { TagCloud } from '@/components/ui/TagCloud';

const TrendingSearches = () => {
    const tags = [
        'Big Buck Bunny', 'Sintel', 'Action Movies', '4K Trailers',
        'Comedy Shorts', 'Trending Now', 'Viral Videos', 'New Releases',
        'Top Rated', 'Most Viewed', 'Verified Amateurs', 'Exclusive',
        'VR Content', 'Live Cams'
    ];

    return (
        <div className="border-t border-border pt-8 mb-8">
            <h4 className="flex items-center gap-2 text-muted-foreground font-bold text-[10px] uppercase tracking-widest mb-4 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Trending Searches
            </h4>
            <TagCloud tags={tags} />
        </div>
    );
};

export default TrendingSearches;
