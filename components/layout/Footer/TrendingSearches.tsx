'use client';

import React from 'react';
import Link from 'next/link';

const TrendingSearches = () => {
    const tags = [
        'Big Buck Bunny', 'Sintel', 'Action Movies', '4K Trailers',
        'Comedy Shorts', 'Trending Now', 'Viral Videos', 'New Releases',
        'Top Rated', 'Most Viewed', 'Verified Amateurs', 'Exclusive',
        'VR Content', 'Live Cams'
    ];

    return (
        <div className="border-t border-border pt-8 mb-8">
            <h4 className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest mb-4 opacity-70">Trending Searches</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
                {tags.map((tag, i) => (
                    <Link
                        key={i}
                        href={`/search?q=${tag}`}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4"
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TrendingSearches;
