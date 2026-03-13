import React from 'react';
import Link from 'next/link';

interface PopularTagsProps {
    tagFilter?: string | null;
}

const POPULAR_TAGS = ['Japanese', 'Massage', 'POV', 'Hentai', 'Big Tits', 'Anal', 'Lesbian'];

export default function PopularTags({ tagFilter }: PopularTagsProps) {
    return (
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-wrap gap-1.5 sm:gap-2 items-center">
            <span className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-secondary/50 backdrop-blur text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest border border-white/5">
                Popular Tags:
            </span>
            {POPULAR_TAGS.map((tag) => (
                <Link
                    key={tag}
                    href={`/?tag=${tag}`}
                    className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all border ${tagFilter === tag
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105'
                            : 'bg-card hover:bg-white/10 hover:text-white border-white/10 hover:border-white/20'
                        }`}
                >
                    {tag}
                </Link>
            ))}
            {tagFilter && (
                <Link
                    href="/"
                    className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 text-[10px] sm:text-xs font-bold transition-all border border-destructive/20 ml-1 sm:ml-2"
                >
                    Clear Filter
                </Link>
            )}
        </div>
    );
}
