import React from 'react';
import { Sparkles, TrendingUp, PlaySquare, Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TagCloudProps {
    tags: string[];
    className?: string;
    baseUrl?: string;
}

export const TagCloud: React.FC<TagCloudProps> = ({ tags, className, baseUrl = '/search?q=' }) => {
    return (
        <div className={cn("flex flex-wrap gap-x-3 gap-y-2", className)}>
            {tags.map((tag, i) => {
                // If it's a specific known page route
                let linkPath = `${baseUrl}${tag}`;
                if (tag === 'Trending Now') linkPath = '/trending';
                if (tag === 'Top Rated') linkPath = '/top-rated';
                if (tag === 'New Releases') linkPath = '/new-releases';
                if (tag === 'Live Cams') linkPath = '/live';
                if (tag === 'VR Content') linkPath = '/vr';

                return (
                    <Link
                        key={i}
                        href={linkPath}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-card/50 text-muted-foreground border border-border/50 rounded-full hover:text-primary hover:border-primary/50 transition-all hover:shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                    >
                        {tag === 'Trending Now' && <TrendingUp className="w-3 h-3 text-primary" />}
                        {tag === 'Top Rated' && <Star className="w-3 h-3 text-yellow-500" />}
                        {tag === 'New Releases' && <Sparkles className="w-3 h-3 text-blue-400" />}
                        {tag === 'Live Cams' && <PlaySquare className="w-3 h-3 text-red-500" />}
                        {tag}
                    </Link>
                );
            })}
        </div>
    );
};

export default TagCloud;
