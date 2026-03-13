/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "Tags" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Tag } from 'lucide-react';
import TagCard from '@/components/tags/TagCard';

export default function TagsPage() {
    const tags = [
        { name: 'Japanese', videoCount: 15420, trending: true },
        { name: 'Massage', videoCount: 8390, trending: true },
        { name: 'POV', videoCount: 6510, trending: true },
        { name: 'Hentai', videoCount: 11200 },
        { name: 'Big Tits', videoCount: 4320 },
        { name: 'Anal', videoCount: 3100 },
        { name: 'Lesbian', videoCount: 4120 },
        { name: 'MILF', videoCount: 9400, trending: true },
        { name: 'Amateur', videoCount: 18200 },
        { name: 'Ebony', videoCount: 3800 },
        { name: 'Teen', videoCount: 14000, trending: true },
        { name: 'Threesome', videoCount: 5200 },
    ];

    return (
        <div className="flex min-h-screen bg-background text-foreground relative">
            <Sidebar />
            <main className="flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden pt-4 sm:pt-6 lg:ml-64">
                <div className="max-w-[1800px] mx-auto space-y-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Tag className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">All Tags</h1>
                    </div>
                    <p className="text-muted-foreground mb-8">Browse the most popular categories and niches.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                        {tags.map((tag) => (
                            <TagCard key={tag.name} {...tag} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
