'use client';

import React, { useState } from 'react';
import { Eye, Calendar, ChevronDown } from 'lucide-react';

interface VideoDescriptionProps {
    views: string | number;
    date?: string;
    tags?: string[];
    description?: string;
}

export default function VideoDescription({ views, date, tags, description }: VideoDescriptionProps) {
    const [showFullDesc, setShowFullDesc] = useState(false);

    return (
        <div className="bg-secondary/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-white/5 backdrop-blur-md">
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 font-semibold text-xs sm:text-sm text-foreground/80 mb-2 sm:mb-3">
                <span className="flex items-center gap-1 sm:gap-1.5"><Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" /> {views} views</span>
                <span className="flex items-center gap-1 sm:gap-1.5"><Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" /> {date}</span>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                    {tags?.map(tag => (
                        <span key={tag} className="text-primary hover:text-primary/80 cursor-pointer text-xs sm:text-sm">#{tag}</span>
                    ))}
                </div>
            </div>

            <div className={`relative overflow-hidden transition-all duration-300 ${showFullDesc ? 'max-h-96' : 'max-h-16 sm:max-h-20'}`}>
                <p className="text-foreground/90 leading-relaxed text-xs sm:text-sm md:text-base">
                    {description || "Experience the ultimate collection of premium scenes. Exclusive content only available here. Watch high-quality 4K videos updated daily."}
                    <br /><br />
                    This video features stunning cinematography and 4k resolution. Don&apos;t forget to like and subscribe for more content.
                    Follow us on social media for daily updates and behind-the-scenes footage.
                </p>
                {!showFullDesc && (
                    <div className="absolute bottom-0 left-0 w-full h-10 sm:h-12 bg-gradient-to-t from-secondary/50 to-transparent" />
                )}
            </div>
            <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
                {showFullDesc ? 'Show less' : 'Show more'}
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${showFullDesc ? 'rotate-180' : ''}`} />
            </button>
        </div>
    );
}
